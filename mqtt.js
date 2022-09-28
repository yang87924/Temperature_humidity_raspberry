const { json } = require('express')
const mqtt = require('mqtt')
const clientId="yang"
require('dotenv').config(); //載入.env環境檔
var options = {
  host: process.env.mq_host,
  port: process.env.mq_port,
  protocol: process.env.mq_protocol,
  username: process.env.mq_username,
  password: process.env.mq_password
}
// initialize the MQTT client
var client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', (topic, payload) => {

    //console.log('Received Message:', topic, payload.toString())
    console.log(payload.toString())
    var message=JSON.parse(payload)
    //console.log(message.Temperature)
    //取值出來存入變數
    var h=message.humidity
    var t=message.Temperature
    var times=message.Time
    //console.log(typeof times)
    //存進資料庫
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: process.env.mysql_host,
        user: process.env.mysql_user,
        password: process.env.mysql_password,
        database: process.env.mysql_database,
        port:process.env.mysql_port
      });
    con.connect(function(err) {
      if (err) throw err;
      //console.log("Connected!");
      var sql = `INSERT INTO dbmqtt (t, h,time) VALUES  ('${t}','${h}','${times}')`; 
      con.query(sql, function (err, result) {
        if (err) throw err;
        con.end()
        //console.log("1 record inserted");
      });
    });
   
  })
client.subscribe('Try/MQTT');

//---------------
