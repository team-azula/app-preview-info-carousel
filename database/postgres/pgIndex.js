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
const sequelize = new Sequelize('SDC-backend', 'SDC-backend', 'gimmie', {
  host: 'localhost',
  dialect: 'postgres',
  logging: console.log
});

const AppPreviewData = sequelize.define('app', {
  app_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  preview_data: {
    type: Sequelize.JSON
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  }
});


const initDb = async () => {
  return sequelize.sync({ force: true })
  .catch((err) => {
    console.log('error when trying sequelize.sync(): ', err);
    return err;
  });
};

const addSingleApp = async (inputObj) => {
  return AppPreviewData.create({ preview_data: inputObj })
    .catch((err) => {
      console.log('there was an error adding a single entry into AppPreviewData: ', err);
      return err;
    });
};

const addBulkApps = async (inputArray) => {
  return AppPreviewData.bulkCreate(inputArray)
    .catch((err) => {
      console.log('error in addBulkApps: ', err);
    });
};

const getAllAppData = async () => {
  return AppPreviewData.findAll({
    raw: true
  })
    .catch((err) => {
      console.log('error selecting all from AppPreviewData: ', err);
    });
};


/**
 * to test connection, uncomment testConnection() and run this file
 */
const testConnection = async () => {
  await sequelize.authenticate()
  .then(() => {
    console.log('connection to postgres successful')
  })
  .catch((err) => {
    console.log('there was an error connecting to the postgres database: ', err);
  });
};
// testConnection();

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




module.exports = { initDb, addSingleApp, addBulkApps, getAllAppData };
