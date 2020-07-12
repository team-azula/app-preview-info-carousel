const ExpressCassandra = require('express-cassandra');
const db = require('./cassIndex.js');


const initCassDb = () => {
  return db.addSingleApp
};



module.exports = { initCassDb };