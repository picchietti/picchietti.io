const mysql = require('mysql');

const pool = mysql.createPool({
  host     : 'mysql',
  user     : process.env.PICCHIETTI_MYSQL_USER,
  password : process.env.PICCHIETTI_MYSQL_PASSWORD,
  database : process.env.PICCHIETTI_MYSQL_DATABASE,
  port     : 3306
});

module.exports = pool;
