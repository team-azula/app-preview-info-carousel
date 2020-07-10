const faker = require('faker');
const db = require('./pgIndex.js');


let firstObj = [
  {
    "preview_data": {
      "images": [
        'url number 1',
        'url number AAAAAAAAAAAAAAAAAA',
        'url number asdjkfjasdf3',
        'url number 4'
      ],
      "app_description": "X",
      "additional_text": "Y"
    }
  }
];



let dataSize = 100000;
let startTime = null;
let endTime = null;

const seedPostgresDb = () => {
  return db.initDb()
  .then(() => {
    startTime = new Date().valueOf();
    let promiseArray = [];
    for (let i = 0; i < dataSize; i++) {
      promiseArray.push(db.addBulkApps(firstObj))
    }
    return Promise.all(promiseArray);
  })
  .then((response) => {
    // console.log('response from addSingleApp: ', response);
    endTime = new Date().valueOf();
    let totalTime = ((endTime - startTime) / 1000);
    console.log(`total time to add ${dataSize} to db was ${totalTime}`);
  })
  .catch((err) => {
    console.log('error inside seedPostgresDb: ', err);
  });
};

seedPostgresDb();


