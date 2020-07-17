const db = require('../database/postgres/pgIndex.js');


const getOneById = async (id) => {
  let result = await db.getSingleApp(id);
  return result;
};


module.exports = { getOneById };

