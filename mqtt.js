const port=1883
const connectUrl = `mqtt: //${"192.168.168.77"}:${port}` 
const { json } = require('express')
const mqtt = require('mqtt')
const clientId="yang"

const  client = mqtt. connect (connectUrl, { 
   clientId, clean : true ,
   connectTimeout : 4000 ,
   reconnectPeriod : 1000 , 
})

const topic = "Try/MQTT"
client.on('connect', () => {
  console.log('Connected')
  client.subscribe([topic], () => {
    //console.log(`Subscribe to topic '${topic}'`)
  })
})
client.on('message', (topic, payload) => {

    //console.log('Received Message:', topic, payload.toString())
    console.log(payload.toString())
    var message=JSON.parse(payload)
    console.log(message.Temperature)
    var h=message.humidity
    var t=message.Temperature
    var times=message.Time
    console.log(typeof times)
    var mysql = require('mysql');
    var con = mysql.createConnection({
      host: "localhost",
      user: "root2",
      password: "password2",
      database: "dbmqtt"
    });

    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = `INSERT INTO dbmqtt (t, h,time) VALUES  ('${t}','${h}','${times}')`; 
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    });
   
  })
