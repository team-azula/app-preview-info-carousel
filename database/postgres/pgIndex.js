const pg = require('pg');
// const connectionString = 'postgres://postgres:gimmie@localhost:5432/SDC-backend';
// const pgClient = new pg.Client(connectionString);

const { Sequelize } = require('sequelize');
/**
 * database name: 'SDC-backend'
 * username: postgres
 * password: 'gimmie'
 * host: localhost
 */
const sequelize = new Sequelize('SDC-backend', 'postgres', 'gimmie', {
  host: 'localhost',
  dialect: 'postgres'
});

const testConnection = async () => {
  await sequelize.authenticate()
  .then(() => {
    console.log('connection to postgres successful')
  })
  .catch((err) => {
    console.log('there was an error connecting to the postgres database: ', err);
  });
};

testConnection();
// const connectAndQuerryPostgres = () => {
//   pgClient.connect()
//     .then(() => {
//       return pgClient.query("select * from dave")
//     })
//     .catch((err) => {
//       console.log('error: ', err);
//     })
//     .then((queryResult) => {
//       console.log('queryResult: ', queryResult);
//     })
// };






