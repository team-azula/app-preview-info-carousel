const faker = require('faker');
const db = require('./pgIndex.js');





let firstObj = {
  "images": [
    'url number 1',
    'url number asdfasjdfasd2',
    'url number asdjkfjasdf3',
    'url number 4'
  ],
  "app_description": "X",
  "additional_text": "Y"
};

let count = 1;
const seedPostgresDb = () => {
  return db.initDb()
  .then(() => {
    return db.addSingleApp(firstObj)
  })
  .then((response) => {
    console.log('response from addSingleApp: ', response);
  })
  .catch((err) => {
    console.log('error inside seedPostgresDb: ', err);
  });
};

seedPostgresDb();


