import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, Platform, ViewController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { BLE } from '@ionic-native/ble';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) { }

  openModal(characterNum) {
    let modal = this.modalCtrl.create(ModalContentPage, characterNum);
    modal.present();
  }

}

@Component({
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>
      Modo Automático
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content>

<ion-range min="0" max="255" step="10" snaps="true" [(ngModel)]="Tem" color="danger" (ngModelChange)="Temperatura($event)">
<ion-icon range-left small color="danger" name="thermometer"></ion-icon>
<ion-icon range-right color="danger" name="thermometer"></ion-icon>
</ion-range>

<ion-range min="0" max="255" step="10" snaps="true" [(ngModel)]="Vib" color="default" (ngModelChange)="Vibracion($event)">
<ion-icon range-left small color="default" name="ios-analytics-outline"></ion-icon>
<ion-icon range-right color="default" name="ios-analytics-outline"></ion-icon>
</ion-range>

</ion-content>
`
})
export class ModalContentPage {
  character;

  Vib = 0;
  Tem = 0;
  trainvalue: any;

  serviceUUID: any;
  txCharacteristic: any;
  rxCharacteristic: any;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public global: GlobalProvider,
    public ble: BLE
  ){

    this.serviceUUID      = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';//UART Service
    this.txCharacteristic = '6e400002-b5a3-f393-e0a9-e50e24dcca9e'; // transmit is from the phone's perspective
    this.rxCharacteristic = '6e400003-b5a3-f393-e0a9-e50e24dcca9e'; // receive is from the phone's perspective

  }

  brightness: number = 20;
   contrast: number = 0;
   warmth: number = 1300;
   structure: any = { lower: 33, upper: 60 };
   text: number = 0;

   Temperatura() {
    //console.log("Temperatura");
    //console.log(this.Tem);

    //let unit : string = (this.Tem).toString;
    var data = this.stringToBytes("Temp,"+(this.Tem).toString());
    //console.log(data);

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

  Vibracion() {
    console.log("Vibración");
    console.log(this.Vib);

        //let unit : string = (this.Tem).toString;
        var data = this.stringToBytes("Vib,"+(this.Vib).toString());

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


  dismiss() {
    this.viewCtrl.dismiss();
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
