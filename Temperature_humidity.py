import time
import Adafruit_DHT
import paho.mqtt.client as mqtt
import json
import datetime
 
GPIO_PIN = 4
# 初始化地端程式
client = mqtt.Client()
# 設定連線資訊(IP, Port, 連線時間)
client.connect("192.168.168.77", 1883, 60)
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
