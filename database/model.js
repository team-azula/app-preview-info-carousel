const mongoose = require('mongoose');
const db = require('./index.js');

const carouselSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  app_description: String,
  additional_text: String,
  images: Array
});

const Carousels = mongoose.model( 'Carousel', carouselSchema );


// findAll retrieves all appimages data
function findAll(callback) {
  Carousels.find({}, callback);
}

// findOne will retrieve the appimage associated with the given id
function findOne(id, callback) {
  Carousels.find({ id: id }, callback);
}
// db.find({ id: id })

// insertOne inserts one appImages schema into db
const insertOne = async (schema) => {
  // return Carousels.create(schema, callback);
  return 'returned from insertOne in model.js';
};

// Fetch apps by id from database
const getApps = async (id, callback) => {
  return Carousels.find({ "by.id": id }, callback);
};


// exports.findOne = findOne;
// exports.findAll = findAll;
// exports.insertOne = insertOne;
// exports.Carousels = Carousels;
// module.exports = Carousels;
module.exports = {
  findOne, findAll, insertOne, Carousels
};