// const port=1883
// const connectUrl = `mqtt: //${"192.168.168.77"}:${port}` 
// const { json } = require('express')
// const mqtt = require('mqtt')
// const clientId="yang"

// const  client = mqtt. connect (connectUrl, { 
//    clientId, clean : true ,
//    connectTimeout : 4000 ,
//    reconnectPeriod : 1000 , 
// })

// const topic = "Try/MQTT"
// client.on('connect', () => {
//   console.log('Connected')
//   client.subscribe([topic], () => {
//     //console.log(`Subscribe to topic '${topic}'`)
//   })
// })
// client.on('message', (topic, payload) => {

//     //console.log('Received Message:', topic, payload.toString())
//     console.log(payload.toString())
//     var message=JSON.parse(payload)
//     //console.log(message.Temperature)
//     //取值出來存入變數
//     var h=message.humidity
//     var t=message.Temperature
//     var times=message.Time
//     //console.log(typeof times)
//     //存進資料庫
//     var mysql = require('mysql');
//     // var con = mysql.createConnection({
//     //   host: "localhost",
//     //   user: "root2",
//     //   password: "password2",
//     //   database: "dbmqtt"
//     // });
//     var con = mysql.createConnection({
//         host: "sql6.freesqldatabase.com",
//         user: "sql6522544",
//         password: "IH5NCK1PP7",
//         database: "sql6522544",
//         port:3306
//       });

//     con.connect(function(err) {
//       if (err) throw err;
//       //console.log("Connected!");
//       var sql = `INSERT INTO dbmqtt (t, h,time) VALUES  ('${t}','${h}','${times}')`; 
//       con.query(sql, function (err, result) {
//         if (err) throw err;
//         con.end()
//         //console.log("1 record inserted");
//       });
//     });
   
//   })

  //-------------------------------------
  //----------------

const { json } = require('express')
const mqtt = require('mqtt')
const clientId="yang"

var options = {
  host: '73d41a0a34ed462c85362f9e403ba1b2.s2.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts',
  username: 'root1',
  password: 'password1'
}
// initialize the MQTT client
var client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
    //console.log('Connected');
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
    // var con = mysql.createConnection({
    //   host: "localhost",
    //   user: "root2",
    //   password: "password2",
    //   database: "dbmqtt"
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
