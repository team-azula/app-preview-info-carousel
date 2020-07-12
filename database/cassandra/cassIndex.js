const ExpressCassandra = require('express-cassandra');

const models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ['localhost'],
    protocalOptions: { port: 9042 },
    keyspace: 'cassandra_keyspace_01',
    ormOptions: {
      defaultReplicationStrategy : {
          class: 'SimpleStrategy',
          replication_factor: 1
      },
      migration: 'alter',
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


const cassInit = () => {
  return AppPreviewModel.syncDBAsync()
    .catch((err) => {
      console.log('error in cassInit: ', err);
    });
};



const addSingleApp = (dataObj) => {
  const { images, app_description, additional_text } = dataObj;
  let newEntry = new AppPreviewModel({ images, app_description, additional_text });
  return newEntry.saveAsync(newEntry)
    .then((dbResponse) => {
      return dbResponse;
    })
    .catch((err) => {
      console.log('error in addSingleApp: ', err);
      return err;
    });
};


const readAllApps = () => {
  return AppPreviewModel.findAsync({})
    .then((cassResponse) => {
      return cassResponse;
    })
    .catch((err) => {
      console.log('error in readAllApps: ', err);
      return err;
    });
};


module.exports = { addSingleApp, cassInit, readAllApps };

