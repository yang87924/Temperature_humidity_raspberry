var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/list',function(req,res,next){

  var con = mysql.createConnection({
    host: "localhost",
    user: "root2",
    password: "password2",
    database: "dbmqtt"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    con.query(`SELECT * FROM dbmqtt order by id desc limit 7`, function (err, result, fields) {
      if (err) throw err;
      //console.log(result);
      //res
      res.status(200).json({data:result})
    });
  });
  //res.status(200).json({user:"hello"})
})

module.exports = router;
