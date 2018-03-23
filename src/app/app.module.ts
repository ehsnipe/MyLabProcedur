import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatMenuModule, MatTableModule,  MatDialogModule,
        MatInputModule, MatRippleModule,
        MatAutocompleteModule,
        MatButtonToggleModule,
        MatCardModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatListModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        } from '@angular/material';

import {MatFormFieldModule} from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { NavmenuComponent } from './app/navmenu/navmenu.component';
import { ViewProcedurerComponent } from './view-procedurer/view-procedurer.component';
import { AppRoutingModule } from './/app-routing.module';

import { ProcedurService } from './services/procedur.service';
import {LogService, LogEvent } from './services/log.service';
import { FargningService } from './services/fargning.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { ViewReglerComponent } from './view-regler/view-regler.component';
import { RegelService } from './services/regel.service';
import { CreateprocedurComponent } from './createprocedur/createprocedur.component';
import { CreateregelComponent } from './createregel/createregel.component';
import { RegelTesterComponent } from './regel-tester/regel-tester.component';
import { ViewFargningComponent } from './view-fargning/view-fargning.component';

@NgModule({
  declarations: [
    AppComponent,
    NavmenuComponent,
    ViewProcedurerComponent,
    MessagesComponent,
    ViewReglerComponent,
    CreateprocedurComponent,
    CreateregelComponent,
    RegelTesterComponent,
    ViewFargningComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatMenuModule, MatTableModule, MatFormFieldModule, MatDialogModule,
    MatInputModule, MatRippleModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  providers: [ProcedurService, MessageService, RegelService, 
              LogService, LogEvent, FargningService],
  bootstrap: [AppComponent]
})
export class AppModule { }
