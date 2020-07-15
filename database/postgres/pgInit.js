const db = require('./pgIndex.js');

const initializePostgresDatabase = () => {
  return db.initDb()
    .then((initResult) => {
      console.log('postgres db initialized: ', initResult);
    })
    .catch((err) => {
      console.log('there was an error initializing the db: ', err);
    });
};

initializePostgresDatabase();
