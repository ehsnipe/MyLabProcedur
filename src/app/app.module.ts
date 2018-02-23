import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavmenuComponent } from './app/navmenu/navmenu.component';
import { ViewProcedurerComponent } from './view-procedurer/view-procedurer.component';
import { AppRoutingModule } from './/app-routing.module';

import { ProcedurService } from './services/procedur.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';

@NgModule({
  declarations: [
    AppComponent,
    NavmenuComponent,
    ViewProcedurerComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule],
  providers: [ProcedurService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
