const MongoClient = require('mongodb').MongoClient;
const db_user = process.env.MONGODB_USER;
const db_pass = process.env.MONGODB_PASS;
const db_host = 'mongo';
const db_port = 27017;
const db_name = process.env.MONGODB_DBNAME;
const url = `mongodb://${db_user}:${db_pass}@${db_host}:${db_port}/${db_name}`;

const options = {

};

let db_promise = new Promise(function (fulfill, reject){
  MongoClient.connect(url, options, function(error, client) {
    if(error)
      return reject(error);

    console.log('CONNECTED TO MONGO');
    fulfill(client.db(db_name));
  });
});

module.exports = {
  getConnection: function() {
    return db_promise;
  }
};
