var mysql = require('mysql');
const { connect } = require('./routes');
let counter = 1;

setInterval(() => {
    console.log(counter++)
    con = mysql.createConnection({
        host: "sql6.freesqldatabase.com",
        user: "sql6522544",
        password: "IH5NCK1PP7",
        database: "sql6522544",
        port: 3306
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