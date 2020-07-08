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
function findAll() {
  return Carousels.find({})
    .catch((err) => {
      console.log('error inside model.findAll(): ', err);
    });
};

// findOne will retrieve the appimage associated with the given id
const findOne = async (id, callback) => {
  return Carousels.find({ id })
    .catch((err) => {
      console.log('error inside model.findOne(): ', err);
      return err;
    });
};

// insertOne inserts one appImages schema into db
const insertOne = async (data) => {
  return Carousels.create(data)
    .catch((err) => {
      console.log('error inside model.insertOne(): ', err);
      return err;
    });
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