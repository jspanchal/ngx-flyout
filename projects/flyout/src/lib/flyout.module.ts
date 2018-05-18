import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlyoutComponent } from './flyout.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [FlyoutComponent],
  exports: [FlyoutComponent]
})
export class FlyoutModule { }
