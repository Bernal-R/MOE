import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Device } from './device';

@NgModule({
  declarations: [
    Device,
  ],
  imports: [
    IonicPageModule.forChild(Device),
  ],
  exports: [
    Device
  ]
})
export class DeviceModule {}
