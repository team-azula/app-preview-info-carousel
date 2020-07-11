const db = require('./cassIndex.js');


let sampleEntry = {
  images: [
    "image URL 01",
    "image URL 02",
    "image URL 03",
    "image URL 04",
    "image URL 05",
    "image URL 06",
    "image URL 07",
  ],
  app_description: 'THIS IS THE APP DESCRIPTION WHOOPTY DOO',
  additional_text: 'THIS IS THE ADDITIONAL TEXT WUTTTTTTTT'
};

const addSingleEntry = (dataObj) => {
  const { images, app_description, additional_text } = dataObj;
  return db.addSingleApp( {images, app_description, additional_text} )
    .then((cassandraResponse) => {
      console.log('response from cassandra in cassSeed.addSingleEntry: ', cassandraResponse)
      return response;
    })
    .catch((err) => {
      console.log('error in cassSeed.addSingleEntry: ', err);
      return err;
    });
};

addSingleEntry(sampleEntry);


