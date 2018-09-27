const MongoClient = require('mongodb').MongoClient;
const dbUser = process.env.MONGODB_USER;
const dbPass = process.env.MONGODB_PASS;
const dbHost = 'mongo';
const dbPort = 27017;
const dbName = process.env.MONGODB_DBNAME;
const url = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;

const options = {

};

const dbClient = new Promise(function(fulfill, reject) {
  MongoClient.connect(url, options, function(error, client) {
    if(error) {
      reject(error);
      return;
    }

    console.log('CONNECTED TO MONGO');
    fulfill(client);
  });
});

function getConnection() {
  return dbClient;
}

module.exports = {
  getConnection: getConnection,

  getDb: () => (
    getConnection().then((client) => (
      client.db(dbName)
    ))
  ),
  close: () => (
    getConnection().then((client) => (
      client.close()
    ))
  )
};
