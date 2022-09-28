var mysql = require('mysql');
const { connect } = require('./routes');
let counter = 1;
require('dotenv').config(); //載入.env環境檔

setInterval(() => {
    console.log(counter++)
    con = mysql.createConnection({
        host: process.env.mysql_host,
        user: process.env.mysql_user,
        password: process.env.mysql_password,
        database: process.env.mysql_database,
        port: process.env.mysql_port
    });
    con.connect(function (err) {
        if (err) throw err;
        con.query(`SELECT * FROM dbmqtt order by id desc limit 7`, function (err, result, fields) {
            if (err) throw err;
            //console.log(result);
            //res
            con.end()
        });
    });
}, 1000);