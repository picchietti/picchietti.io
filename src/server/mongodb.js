const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

const dbUser = process.env.MONGODB_USER;
const dbPass = process.env.MONGODB_PASS;
const dbHost = 'mongo';
const dbPort = 27017;
const dbName = process.env.MONGODB_DBNAME;
const url = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;

const caCert = fs.readFileSync('/usr/src/app/src/secret/rootCA.pem');
const fullCert = fs.readFileSync(process.env.MONGODB_FULL_CERT_PATH);

const options = {
  ssl: true,
  sslCA: [caCert],
  sslCert: fullCert,
  sslKey: fullCert,
  useNewUrlParser: true,
  checkServerIdentity: process.env.NODE_ENV !== 'development'
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

const getConnection = () => (
  dbClient
);

module.exports = {
  getConnection,

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
