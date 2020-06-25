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
function insertOne(schema, callback) {
  Carousels.create(schema, callback);
}

// Fetch apps by id from database
function getApps(id, callback) {
  Carousels.find({ "by.id": id }, callback);
}


exports.findOne = findOne;
exports.findAll = findAll;
exports.insertOne = insertOne;
exports.Carousels = Carousels;
module.exports = Carousels;
