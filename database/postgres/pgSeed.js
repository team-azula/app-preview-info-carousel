const faker = require('faker');
const db = require('./pgIndex.js');


let firstObj = {
  "preview_data": {
    "images": [
      'some image URL 01',
      'some image URL 02',
      'some image URL 03',
      'some image URL 04',
      'some image URL 05',
      'some image URL 06',
      'some image URL 07',
      'some image URL 08',
      'some image URL 09'
    ],
    "app_description": "X",
    "additional_text": "Y"
  }
};

const getFakerImageURLs = (num) => {
  let images = [];
  for (let i = 0; i < num; i++) {
    let image = faker.image.imageUrl();
    console.log('image: ', image);
    images.push(image);
  }
  return images;
};

const getFakerParagraph = () => {
  return faker.lorem.paragraph();
};

const makeFakeData = (numOfDataPoints) => {
  let result = [];
  for (let i = 0; i < numOfDataPoints; i++) {
    let dataPoint = { preview_data: {} };
    dataPoint.preview_data["images"] = getFakerImageURLs(8);
    dataPoint.preview_data["app_description"] = getFakerParagraph();
    dataPoint.preview_data["additional_text"] = getFakerParagraph();
    console.log('dataPoint: ', dataPoint);
    result.push(dataPoint);
  }
  // console.log('result from makeFakeData: ', result);
  return result;
};

const insertBulk = (dataArray) => {
  return db.addBulkApps(dataArray);
};

let chunkSize = 100;

const seedPostgresDb = (dataSize) => {
  let startTime = new Date().valueOf();
  let inserted = 0;
  return new Promise((resolve, reject) => {
    const doNext = () => {
      if (inserted >= dataSize) {
        resolve();
        return;
      } else {
        let dataChunk = makeFakeData(chunkSize);
        insertBulk(dataChunk)
          .then(() => {
            inserted += dataChunk.length;
            doNext();
          })
          .catch((err) => {
            console.log('error with insertBulk: ', err);
            resolve(err);
          });
      }
    }
    doNext();
  })
  .then(() => {
    let endTime = new Date().valueOf();
    let totalTime = ((endTime - startTime) / 1000);
    console.log(`Done seeding db of ${dataSize} records with chunks of ${chunkSize}. Finished in ${totalTime} seconds, with recs-per-sec of ${Math.round(dataSize/totalTime)}`);
  })
  .catch((err) => {
    console.log('there was an error seeding postgres: ', err);
  });
};

const seed = () => {
  seedPostgresDb(100);
};
seed();


