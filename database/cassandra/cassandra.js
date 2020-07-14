const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['172.18.0.3'],
  protocalOptions: { port: '9042' },
  keyspace: 'cassandra_keyspace_01',
  localDataCenter: 'datacenter1'
});

// console.log('client: ', client);
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

// getOneById('82b3dc30-d37e-4be8-9167-f698cedc088b')
//   .then((result) => {
//     console.log('result: ', result);
//   })
//   .catch((err) => {
//     console.log('err: ', err);
//   })


module.exports = { getStateOfCassandra, getOneById };

