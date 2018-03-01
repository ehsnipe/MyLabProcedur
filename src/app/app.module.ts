import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatMenuModule, MatTableModule, MatFormFieldModule, MatDialogModule} from '@angular/material';

import { AppComponent } from './app.component';
import { NavmenuComponent } from './app/navmenu/navmenu.component';
import { ViewProcedurerComponent } from './view-procedurer/view-procedurer.component';
import { AppRoutingModule } from './/app-routing.module';

import { ProcedurService } from './services/procedur.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { ViewReglerComponent } from './view-regler/view-regler.component';
import { RegelService } from './services/regel.service';
import { CreateprocedurComponent } from './createprocedur/createprocedur.component';
import { CreateregelComponent } from './createregel/createregel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavmenuComponent,
    ViewProcedurerComponent,
    MessagesComponent,
    ViewReglerComponent,
    CreateprocedurComponent,
    CreateregelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatMenuModule, MatTableModule, MatFormFieldModule, MatDialogModule
  ],
  providers: [ProcedurService, MessageService, RegelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
