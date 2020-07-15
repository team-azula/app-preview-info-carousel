const cassandra = require('cassandra-driver');

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


/**
 * test connection by making a query with id you know to exist
 */
// getOneById('60d93601-de8d-4725-bb8d-0ab2f865161a')
//   .then((result) => {
//     console.log('result: ', result);
//   })
//   .catch((err) => {
//     console.log('err: ', err);
//   })


module.exports = { getStateOfCassandra, getOneById, insertOne };

