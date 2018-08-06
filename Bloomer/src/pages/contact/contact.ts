import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { GlobalProvider } from "../../providers/global/global";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  serviceUUID: any;
  txCharacteristic: any;
  rxCharacteristic: any;

  constructor(public navCtrl: NavController, public ble: BLE, public global: GlobalProvider) {
    this.serviceUUID      = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';//UART Service
    this.txCharacteristic = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'; // transmit is from the phone's perspective
    this.rxCharacteristic = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'; // receive is from the phone's perspective
  }

  Detener(){
    var data = this.stringToBytes("Temp,detener");

       this.ble.write(this.global.myGlobalVar, this.serviceUUID, this.txCharacteristic, data).then(data => {
                    console.log(data);
                    console.log("success");
                   // document.getElementById("resultDiv").innerHTML = document.getElementById("resultDiv").innerHTML + "Sent: " + unit + "<br/>";
                    //document.getElementById("resultDiv").scrollTop = document.getElementById("resultDiv").scrollHeight;
         }, err => {
           console.log("Error");
           //document.getElementById("resultDiv").innerHTML ="Error: " + JSON.stringify(err);
         });
  }

  Detener1(){
    var data = this.stringToBytes("Vib,detener");

       this.ble.write(this.global.myGlobalVar, this.serviceUUID, this.txCharacteristic, data).then(data => {
                    console.log(data);
                    console.log("success");
                   // document.getElementById("resultDiv").innerHTML = document.getElementById("resultDiv").innerHTML + "Sent: " + unit + "<br/>";
                    //document.getElementById("resultDiv").scrollTop = document.getElementById("resultDiv").scrollHeight;
         }, err => {
           console.log("Error");
           //document.getElementById("resultDiv").innerHTML ="Error: " + JSON.stringify(err);
         });
  }

  Bajo(){
    var data = this.stringToBytes("Temp,bajo");
    console.log(data);

       this.ble.write(this.global.myGlobalVar, this.serviceUUID, this.txCharacteristic, data).then(data => {
                    console.log(data);
                    console.log("success");
                   // document.getElementById("resultDiv").innerHTML = document.getElementById("resultDiv").innerHTML + "Sent: " + unit + "<br/>";
                    //document.getElementById("resultDiv").scrollTop = document.getElementById("resultDiv").scrollHeight;
         }, err => {
           console.log("Error");
           //document.getElementById("resultDiv").innerHTML ="Error: " + JSON.stringify(err);
         });
  }

  Medio(){

    var data = this.stringToBytes("Temp,medio");

       this.ble.write(this.global.myGlobalVar, this.serviceUUID, this.txCharacteristic, data).then(data => {
                    console.log(data);
                    console.log("success");
                   // document.getElementById("resultDiv").innerHTML = document.getElementById("resultDiv").innerHTML + "Sent: " + unit + "<br/>";
                    //document.getElementById("resultDiv").scrollTop = document.getElementById("resultDiv").scrollHeight;
         }, err => {
           console.log("Error");
           //document.getElementById("resultDiv").innerHTML ="Error: " + JSON.stringify(err);
         });
  }

  Alto(){
    var data = this.stringToBytes("Temp,alto");

       this.ble.write(this.global.myGlobalVar, this.serviceUUID, this.txCharacteristic, data).then(data => {
                    console.log(data);
                    console.log("success");
                   // document.getElementById("resultDiv").innerHTML = document.getElementById("resultDiv").innerHTML + "Sent: " + unit + "<br/>";
                    //document.getElementById("resultDiv").scrollTop = document.getElementById("resultDiv").scrollHeight;
         }, err => {
           console.log("Error");
           //document.getElementById("resultDiv").innerHTML ="Error: " + JSON.stringify(err);
         });
  }

  Bajo1(){
    var data = this.stringToBytes("Vib,bajo");

       this.ble.write(this.global.myGlobalVar, this.serviceUUID, this.txCharacteristic, data).then(data => {
                    console.log(data);
                    console.log("success");
                   // document.getElementById("resultDiv").innerHTML = document.getElementById("resultDiv").innerHTML + "Sent: " + unit + "<br/>";
                    //document.getElementById("resultDiv").scrollTop = document.getElementById("resultDiv").scrollHeight;
         }, err => {
           console.log("Error");
           //document.getElementById("resultDiv").innerHTML ="Error: " + JSON.stringify(err);
         });
  }
  Medio1(){
    var data = this.stringToBytes("Vib,medio");

       this.ble.write(this.global.myGlobalVar, this.serviceUUID, this.txCharacteristic, data).then(data => {
                    console.log(data);
                    console.log("success");
                   // document.getElementById("resultDiv").innerHTML = document.getElementById("resultDiv").innerHTML + "Sent: " + unit + "<br/>";
                    //document.getElementById("resultDiv").scrollTop = document.getElementById("resultDiv").scrollHeight;
         }, err => {
           console.log("Error");
           //document.getElementById("resultDiv").innerHTML ="Error: " + JSON.stringify(err);
         });
  }
  Alto1(){
    var data = this.stringToBytes("Vib,alto");

       this.ble.write(this.global.myGlobalVar, this.serviceUUID, this.txCharacteristic, data).then(data => {
                    console.log(data);
                    console.log("success");
                   // document.getElementById("resultDiv").innerHTML = document.getElementById("resultDiv").innerHTML + "Sent: " + unit + "<br/>";
                    //document.getElementById("resultDiv").scrollTop = document.getElementById("resultDiv").scrollHeight;
         }, err => {
           console.log("Error");
           //document.getElementById("resultDiv").innerHTML ="Error: " + JSON.stringify(err);
         });
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

}
