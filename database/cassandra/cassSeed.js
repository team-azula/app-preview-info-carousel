const db = require('./cassandra.js');
const cassandra = require('cassandra-driver');
const csv = require('csv');
const faker = require('faker');
const { gettyImages } = require('./images.js');
const { v4: uuidv4 } = require('uuid');

const { executeConcurrent } = cassandra.concurrent;

// let sampleEntry = {
//   images: [
//     "image URL 01",
//     "image URL 02",
//     "image URL 03",
//     "image URL 04",
//     "image URL 05",
//     "image URL 06",
//     "image URL 07",
//   ],
//   app_description: 'THIS IS THE APP DESCRIPTION WHOOPTY DOO',
//   additional_text: 'THIS IS THE ADDITIONAL TEXT WUTTTTTTTT'
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


const generateBatch = (batchSize) => {
  let queries = [];
  for (let i = 0; i < batchSize; i++) {
    let { id, images, app_description, additional_text } = generateRecord();
    let singleRecord = [ id, images, app_description, additional_text ];
    queries.push(singleRecord);
  }
  return queries;
};



const batchSize = 20000;
const seedSize = 10000000;
let startTime;
let endTime;
let totalTime;

const executeSeed = async (batchSize, seedSize) => {
  startTime = new Date().valueOf();
  let totalInserted = 0;

  const executeBatchInsert = async () => {
    let batch = generateBatch(batchSize);
    let insert = await db.concurrentInsert(batch);
    console.log('insert: ', insert);
    totalInserted += batchSize;
  }

  while (totalInserted < seedSize) {
    await executeBatchInsert();
  }

  endTime = new Date().valueOf();
  totalTime = ((endTime - startTime) / 1000);
  console.log(`executed bulk insert of ${seedSize} records in ${totalTime} seconds with speed: ${Math.round(seedSize/totalTime)} records per second`);
};

const initializeSeed = async () => {
  await executeSeed(batchSize, seedSize);
  db.shutDownDb();
};

initializeSeed();



