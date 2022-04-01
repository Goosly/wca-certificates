import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HomeComponent} from './home.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, AngularFontAwesomeModule, MatTabsModule, BrowserAnimationsModule],
  declarations: [ AppComponent, HomeComponent ],
  bootstrap:    [ HomeComponent ]
})
export class AppModule { }
