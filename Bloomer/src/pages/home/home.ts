import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { GlobalProvider } from "../../providers/global/global";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  Vib = 0;
  Tem = 0;

  idGlobal: any;
  devices: any;
  device: any;
  characteristics: any;
  isScanning: any;
  isConnected: any;
  deviceId: any;
  serviceUUID: any;
  txCharacteristic: any;
  rxCharacteristic: any;
//  serviceUUID: any;
  //characteristicUUID: any;


  constructor(public navCtrl: NavController, public ble: BLE, public global: GlobalProvider){

    this.idGlobal = "";
    this.devices = [];
    this.isScanning = false;
    this.isConnected = false;
/*    this.serviceUUID = "ffe0";
    this.characteristicUUID = "ffe1";

var service = "6e524635-312d-444b-2020-202020202020";
var characteristic_read = "6e524635-312d-444b-2062-7574746f6e20";
var characteristic_write = "6e400002-b5a3-f393-e0a9-e50e24dcca9e"

var bleUART = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
var RXD = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";
var TXD = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
*/
    this.serviceUUID      = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';//UART Service
    this.txCharacteristic = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'; // transmit is from the phone's perspective
    this.rxCharacteristic = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'; // receive is from the phone's perspective

  }

  startScanning() {
    console.log('Scanning Started');
    this.devices = [];
    this.isScanning = true;
    this.ble.scan([], 5,).subscribe(device => {
      console.log("Found device: " + JSON.stringify(device));
        this.devices.push(device);
      },
      err => {
      console.log("Error occurred during BLE scan: " + JSON.stringify(err));
      },
    );
    setTimeout(() => {
      this.ble.stopScan().then(() => {
        console.log('Scanning has stopped');
        console.log(JSON.stringify(this.devices));
        this.isScanning = false;
      });
    }, 3000);
  }


connectToDevice(device) {
  console.log('Conecting...');
  this.isConnected = true;
  this.characteristics = [];
  //Conect
  this.ble.connect(device.id).subscribe(peripheralData => {
  this.idGlobal = device.id;
  this.global.myGlobalVar = this.idGlobal;
  console.log(JSON.stringify(peripheralData.characteristics));
  this.characteristics = peripheralData.characteristics;
  this.deviceId = device.id;
  this.isConnected = true;

  //Listen data
  this.ble.startNotification(device.id, this.serviceUUID, this.rxCharacteristic).subscribe(buffer => {
    var data = this.bytesToString(buffer);
    document.getElementById("resultDiv").innerHTML = document.getElementById("resultDiv").innerHTML + "Received: " + data + "<br/>";
    document.getElementById("resultDiv").scrollTop =document.getElementById("resultDiv").scrollHeight;
    }, err => {
      document.getElementById("resultDiv").innerHTML ="Error leyendo: " + JSON.stringify(err);
    });

  },
  peripheralData => {
  this.isConnected = false;
  console.log('disconnected');
   });
}


sendData(){
console.log("Send data");
let unit : string = (document.getElementById("messageInput") as HTMLInputElement).value;
var data = this.stringToBytes(unit);

   this.ble.write(this.idGlobal, this.serviceUUID, this.txCharacteristic, data).then(data => {
                console.log(data);
                console.log("success");
               }, err => {
       console.log("Error");
     });
}


disconnect(){
console.log("Disconect");
this.ble.disconnect(this.idGlobal);
this.isConnected = false;
}



// ASCII only
stringToBytes(string) {
   var array = new Uint8Array(string.length);
   for (var i = 0, l = string.length; i < l; i++) {
       array[i] = string.charCodeAt(i);
    }
    return array.buffer;
}

// ASCII only
bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}


  Temperatura() {
   console.log("Temperatura");
   console.log(this.Tem);

   //let unit : string = (this.Tem).toString;
   var data = this.stringToBytes((this.Tem).toString);

      this.ble.write(this.idGlobal, this.serviceUUID, this.txCharacteristic, data).then(data => {
                   console.log(data);
                   console.log("success");
                  // document.getElementById("resultDiv").innerHTML = document.getElementById("resultDiv").innerHTML + "Sent: " + unit + "<br/>";
                   //document.getElementById("resultDiv").scrollTop = document.getElementById("resultDiv").scrollHeight;
        }, err => {
          console.log("Error");
          //document.getElementById("resultDiv").innerHTML ="Error: " + JSON.stringify(err);
        });
 }

 Vibracion() {
   console.log("Vibración");
   console.log(this.Vib);

   //let unit : string = (this.Vib).toString;
   var data = this.stringToBytes((this.Vib).toString);

      this.ble.write(this.idGlobal, this.serviceUUID, this.txCharacteristic, data).then(data => {
                   console.log(data);
                   console.log("success");
                   //document.getElementById("resultDiv").innerHTML = document.getElementById("resultDiv").innerHTML + "Sent: " + unit + "<br/>";
                   //document.getElementById("resultDiv").scrollTop = document.getElementById("resultDiv").scrollHeight;
        }, err => {
          console.log("Error");
          //document.getElementById("resultDiv").innerHTML ="Error: " + JSON.stringify(err);
        });
 }

}
