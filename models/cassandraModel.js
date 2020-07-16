const db = require('../../database/cassandra/cassandra.js');
const cassandra = require('cassandra-driver');

let startTime;
let endTime;
let totalTime;

const getOneByUUID = async (uuid) => {
  startTime = new Date().valueOf();
  let result = await db.getOneById(uuid);
  console.log(`
    result for query on id ${uuid}:
    ${JSON.stringify(result, null, '  ')}
  `);
  endTime = new Date().valueOf();
  totalTime = (endTime - startTime);
  console.log(`executed query in ${totalTime} miliseconds`);
  await db.shutDownDb();
  return result;
};


getOneByUUID('76339d11-6eb3-4f11-9be3-6ea49ca13b28');


