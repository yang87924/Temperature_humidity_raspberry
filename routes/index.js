var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mqtt=require('../mqtt')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/list',function(req,res,next){

  // var con = mysql.createConnection({
  //   host: "localhost",
  //   user: "root2",
  //   password: "password2",
  //   database: "dbmqtt"
  // });

  // var con = mysql.createConnection({
  //   host: "sql6.freemysqlhosting.net",
  //   user: "sql6522499",
  //   password: "SxnXS1px2h",
  //   database: "sql6522499",
  //   port:3306
  // });
  var con = mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: "sql6522544",
    password: "IH5NCK1PP7",
    database: "sql6522544",
    port:3306
  });
  con.connect(function(err) {
    if (err) throw err;
    con.query(`SELECT * FROM dbmqtt order by id desc limit 7`, function (err, result, fields) {
      if (err) throw err;
      //console.log(result);
      //res
      res.status(200).json({data:result})
      con.end()
    });
  });
  //res.status(200).json({user:"hello"})
})


module.exports = router;
