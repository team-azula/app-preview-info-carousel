const cassandra = require('cassandra-driver');
const { executeConcurrent } = cassandra.concurrent;

const client = new cassandra.Client({
  contactPoints: ['172.18.0.3'],
  protocalOptions: { port: '9042' },
  keyspace: 'cassandra_keyspace_01',
  localDataCenter: 'datacenter1'
});


const getStateOfCassandra = async () => {
  await client.connect();
  const state = client.getState();
  console.log('state: ', state);
  const hosts = state.getConnectedHosts();
  console.log('hosts: ', hosts);
};
// getStateOfCassandra();


const getOneById = async (id) => {
  console.log('id: ', id);
  await client.connect();
  const getOneQuery = `SELECT id,images,app_description,additional_text FROM app WHERE id = ${id}`;
  let result = await client.execute(getOneQuery, id);
  console.log('result.rows from getOneById: ', result.rows);
  return result;
};

// fix so that it does not have to parse data, instead just takes a query and params
const insertOne = async (data) => {
  console.log('data: ', data);
  const { id, images, app_description, additional_text } = data;
  // return;
  await client.connect();
  const insertOneQuery = `INSERT INTO app (id, images, app_description, additional_text) VALUES (?, ?, ?, ?)`;
  const params = [ id, images, app_description, additional_text ];
  let result = await client.execute(insertOneQuery, params, { prepare: true });
  return result;
};

const insertAppQuery = 'INSERT INTO app (id, images, app_description, additional_text) VALUES (?, ?, ?, ?)';

const concurrentInsert = async (queries) => {
  try {
    await client.connect();
    let insertResult = await executeConcurrent(client, insertAppQuery, queries, { concurrencyLevel: 32 });
    return insertResult;
  } catch (err) {
    console.log('error in concurrentInsert: ', err);
    return err;
  }
};

const shutDownDb = () => {
  client.shutdown();
}

module.exports = { getStateOfCassandra, getOneById, insertOne, concurrentInsert, shutDownDb };

