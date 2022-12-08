import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrialComponent } from './trial/trial.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDividerModule,MatListModule} from '@angular/material/';



@NgModule({
  declarations: [
    AppComponent,
    TrialComponent
  ],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatListModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }