const faker = require('faker');
const db = require('./pgIndex.js');


// let firstObj = [
//   {
//     "preview_data": {
//       "images": [
//         'url number 1',
//         'url number AAAAAAAAAAAAAAAAAA',
//         'url number asdjkfjasdf3',
//         'url number 4'
//       ],
//       "app_description": "X",
//       "additional_text": "Y"
//     }
//   },
//   {
//     "preview_data": {
//       "images": [
//         'url number 1',
//         'url number BBBBBBBBBBBBBBBBBb',
//         'url number asdjkfjasdf3',
//         'url number 4'
//       ],
//       "app_description": "Xxxx",
//       "additional_text": "Yxxx"
//     }
//   },
//   {
//     "preview_data": {
//       "images": [
//         'url number 1',
//         'url number CCCCCCCCCCCCCCCCCCCCc',
//         'url number asdjkfjasdf3',
//         'url number 4'
//       ],
//       "app_description": "Xxxxxxxxxxxxxxxxxxx",
//       "additional_text": "Yxxxxxxxxxxxxxxxxxx"
//     }
//   },
//   {
//     "preview_data": {
//       "images": [
//         'url number 1',
//         'url number DDDDDDDDDDDDDDDDDDdd',
//         'url number asdjkfjasdf3',
//         'url number 4'
//       ],
//       "app_description": "Xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
//       "additional_text": "Yxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
//     }
//   }
// ];



let count = 1;
const seedPostgresDb = () => {
  return db.initDb()
  .then(() => {
    return db.addBulkApps(firstObj)
  })
  .then((response) => {
    console.log('response from addSingleApp: ', response);
  })
  .catch((err) => {
    console.log('error inside seedPostgresDb: ', err);
  });
};

seedPostgresDb();


