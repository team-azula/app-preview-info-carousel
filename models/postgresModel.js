const newRelic = require('newrelic');
const db = require('../database/postgres/pgIndex.js');


const getOneById = async (id) => {
  let result = await db.getSingleApp(id);
  console.log('result: ', result);
  return result;
};


module.exports = { getOneById };

