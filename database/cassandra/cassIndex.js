const ExpressCassandra = require('express-cassandra');

const models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ['localhost'],
    protocalOptions: { port: 7000 },
    keyspace: 'cassandra_keyspace_01',
    ormOptions: {
      defaultReplicationStrategy : {
          class: 'SimpleStrategy',
          replication_factor: 1
      },
      migration: 'safe',
    }
  }
});

const AppPreviewModel = models.loadSchema('app', {
  fields: {
    id: {
      type: "uuid",
      default: {"$db_function": "uuid()"}
    },
    images: {
      type: 'list',
      typeDef: "<varchar>"
    },
    app_description: {
      type: 'varchar'
    },
    additional_text: {
      type: 'varchar'
    }
  },
  key: ["id"]
});


const addSingleApp = (dataObj) => {
  const { images, app_description, additional_text } = dataObj;
  let newEntry = new models.instance.app({ images, app_description, additional_text });
  return newEntry.saveAsync(newEntry)
    .then((dbResponse) => {
      console.log('dbResponse in addSingleApp: ', dbResponse);
      return dbResponse;
    })
    .catch((err) => {
      console.log('error in addSingleApp: ', err);
      return err;
    });
};


module.exports = { addSingleApp };
