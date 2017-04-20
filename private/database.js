const mysql = require('mysql');

const pool = mysql.createPool({
  host     : 'mysql',
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE,
  port     : 3306
});

module.exports = pool;
