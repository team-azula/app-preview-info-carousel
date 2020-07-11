const db = require('./pgIndex.js');


const selectOne = async (app_id) => {
  return db.getSingleApp(app_id)
    .then((databaseResponse) => {
      console.log('response from database: ', databaseResponse);
      console.log('images: ', databaseResponse[0].preview_data.images);
      return databaseResponse;
    })
    .catch((err) => {
      console.log('error inside selectOne: ', err);
      return err;
    });
};


selectOne(12);


