// const db = require('./index.js');
var Carousels = require('./model.js');
var mongoose = require('mongoose');
// const imagesData = require('./seed_data');
mongoose.connect('mongodb://database/googleplay');
const faker = require('faker');



// populate db
var seedDb = function (data) {
  Carousels.insertMany(data, (err, docs) => {
    if (err) {
      console.log(`Error populating db ${err}`);
      return;
    }
    console.log('Done populating db!');
  });
};


seedDb(imagesData);


module.exports = seedDb;

