import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavmenuComponent } from './app/navmenu/navmenu.component';
import { ViewProcedurerComponent } from './view-procedurer/view-procedurer.component';
import { AppRoutingModule } from './/app-routing.module';

import { ProcedurService } from './services/procedur.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { ViewReglerComponent } from './view-regler/view-regler.component';
import { RegelService } from './services/regel.service';

@NgModule({
  declarations: [
    AppComponent,
    NavmenuComponent,
    ViewProcedurerComponent,
    MessagesComponent,
    ViewReglerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule],
  providers: [ProcedurService, MessageService, RegelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
