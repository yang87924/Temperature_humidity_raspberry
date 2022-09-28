var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mqtt=require('../mqtt')
require('dotenv').config(); //載入.env環境檔

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/list',function(req,res,next){

  var con = mysql.createConnection({
    host: process.env.mysql_host,
    user: process.env.mysql_user,
    password: process.env.mysql_password,
    database: process.env.mysql_database,
    port: process.env.mysql_port
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
