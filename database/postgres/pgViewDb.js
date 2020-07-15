const db = require('./pgIndex.js');


const getAllPostgresDbData = () => {
  return db.getAllAppData()
    .then((response) => {
      console.log('response from getAllAppData: ', response);
    })
    .catch((err) => {
      console.log('error getting all data from postgres db: ', err);
    });
};

getAllPostgresDbData();

