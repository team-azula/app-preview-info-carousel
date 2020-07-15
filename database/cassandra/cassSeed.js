const db = require('./cassandra.js');
const cassandra = require('cassandra-driver');
const csv = require('csv');
const faker = require('faker');
const { gettyImages } = require('./images.js');
const { v4: uuidv4 } = require('uuid');

const { executeConcurrent } = cassandra.concurrent;

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

// const getRandomImageUrls = (num) => {
//   let urls = [];
//   for (i = 0; i < num; i++) {
//     let randomIndex = Math.floor(Math.random() * gettyImages.length);
//     let url = gettyImages[randomIndex];
//     urls.push(url);
//   }
//   return urls;
// };

// const getFakerParagraph = () => {
//   return faker.lorem.paragraph();
// };

const getRandomImageUrls = (num) => {
  let urls = [];
  for (i = 0; i < num; i++) {
    let randomIndex = Math.floor(Math.random() * gettyImages.length);
    let url = gettyImages[randomIndex];
    urls.push(url);
  }
  return urls;
};

const getFakerParagraph = () => {
  return faker.lorem.paragraph();
};

const generateRecord = () => {
  let dataPoint = {};
  dataPoint["id"] = uuidv4();
  dataPoint["images"] = getRandomImageUrls(8);
  dataPoint["app_description"] = getFakerParagraph();
  dataPoint["additional_text"] = getFakerParagraph();
  return dataPoint;
};

const seedOne = async () => {
  let record = generateRecord();
  let query = await db.insertOne(record);
  // console.log('query: ', query);
  return query;
};

return seedOne()
  .then((result) => {
    console.log('result from seedOne(): ', result);
  })
  .catch((err) => {
    console.log('error from seedOne(): ', err);
  })


let startTime;
let endTime;
let chunkSize = 100;
let totalTime;


// const addSingleEntry = (dataObj) => {
//   return db.cassInit()
//     .then(() => {
//       const { images, app_description, additional_text } = dataObj;
//       return db.addSingleApp( {images, app_description, additional_text} )
//         .catch((err) => {
//           console.log('error adding single App: ', err);
//           return err;
//         })
//     })
//     .then((cassandraResponse) => {
//       console.log('response from cassandra in cassSeed.addSingleEntry: ', cassandraResponse)
//       return cassandraResponse;
//     })
//     .catch((err) => {
//       console.log('error in cassSeed.addSingleEntry: ', err);
//       return err;
//     })
//     // .then(() => {
//     //   return db.readAllApps()
//     // })
//     .then((dbResponse) => {
//       // console.log('dbResponse from readAllApps: ', JSON.stringify(dbResponse, null, '  '));
//       return db.shutdown()
//     })
//     .then(() => {
//       console.log('end');
//     })
//     .catch((err) => {
//       console.log('error: ', err);
//     });
// };

// addSingleEntry(sampleEntry);

// const seedPostgresDb = (dataSize) => {
//   let startTime = new Date().valueOf();
//   let inserted = 0;
//   return new Promise((resolve, reject) => {
//     const doNext = () => {
//       if (inserted >= dataSize) {
//         resolve();
//         return;
//       } else {
//         let dataChunk = makeFakeData(chunkSize);
//         insertBulk(dataChunk)
//           .then(() => {
//             inserted += dataChunk.length;
//             doNext();
//           })
//           .catch((err) => {
//             console.log('error with insertBulk: ', err);
//             resolve(err);
//           });
//       }
//     }
//     doNext();
//   })
//   .then(() => {
//     let endTime = new Date().valueOf();
//     let totalTime = ((endTime - startTime) / 1000);
//     console.log(`Done seeding db of ${dataSize} records with chunks of ${chunkSize}. Finished in ${totalTime} seconds, with recs-per-sec of ${Math.round(dataSize/totalTime)}`);
//   })
//   .catch((err) => {
//     console.log('there was an error seeding postgres: ', err);
//   });
// };

// const seed = () => {
//   seedPostgresDb(100);
// };
// seed();


// const addSingleEntry = (dataObj) => {
//   return db.cassInit()
//     .then(() => {
//       const { images, app_description, additional_text } = dataObj;
//       return db.addSingleApp( {images, app_description, additional_text} )
//         .catch((err) => {
//           console.log('error adding single App: ', err);
//           return err;
//         })
//     })
//     .then((cassandraResponse) => {
//       console.log('response from cassandra in cassSeed.addSingleEntry: ', cassandraResponse)
//       return cassandraResponse;
//     })
//     .catch((err) => {
//       console.log('error in cassSeed.addSingleEntry: ', err);
//       return err;
//     })
//     // .then(() => {
//     //   return db.readAllApps()
//     // })
//     .then((dbResponse) => {
//       // console.log('dbResponse from readAllApps: ', JSON.stringify(dbResponse, null, '  '));
//       return db.shutdown()
//     })
//     .then(() => {
//       console.log('end');
//     })
//     .catch((err) => {
//       console.log('error: ', err);
//     });
// };

// addSingleEntry(sampleEntry);


