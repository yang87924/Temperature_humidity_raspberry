from concurrent.futures import process
import time
import Adafruit_DHT
import paho.mqtt.client as paho
from paho import mqtt
import json
import datetime
import os
from dotenv import load_dotenv
load_dotenv()

GPIO_PIN = 4
client = paho.Client(client_id="", userdata=None, protocol=paho.MQTTv5)
# enable TLS for secure connection
client.tls_set(tls_version=mqtt.client.ssl.PROTOCOL_TLS)
# set username and password
client.username_pw_set(process.env.mq_username, process.env.mq_password)
# connect to HiveMQ Cloud on port 8883 (default for MQTT)
client.connect(process.env.mq_host, process.env.mq_host)

try:
    print('按下 Ctrl-C 可停止程式')
    while True:
        h, t = Adafruit_DHT.read_retry(Adafruit_DHT.DHT11, GPIO_PIN)
        if h is not None and t is not None:
            
            datetime_dt = datetime.datetime.today()
            datetime_str = datetime_dt.strftime("%Y/%m/%d %H:%M:%S")
            #print(datetime_str)
            #print('溫度={0:0.1f}度C 濕度={1:0.1f}%'.format(t, h))
            payload = {'Temperature': t , 'humidity': h,'Time':datetime_str}
            print (json.dumps(payload))
            #要發布的主題和內容
            client.publish("Try/MQTT", json.dumps(payload))
            
        else:
            print('讀取失敗，重新讀取。')
        time.sleep(1)
except KeyboardInterrupt:
    print('關閉程式')
