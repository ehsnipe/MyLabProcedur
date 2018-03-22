import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ViewProcedurerComponent} from './view-procedurer/view-procedurer.component';
import { ViewReglerComponent } from './view-regler/view-regler.component';
import { CreateprocedurComponent } from './createprocedur/createprocedur.component';
import { CreateregelComponent } from './createregel/createregel.component';
import {RegelTesterComponent} from './regel-tester/regel-tester.component';

const routes: Routes = [
  { path: 'procedurer', component: ViewProcedurerComponent },
  { path: 'regler', component: ViewReglerComponent },
  { path: 'procedurer/skapa', component: CreateprocedurComponent },
  { path: 'regler/skapa', component: CreateregelComponent },
  { path: 'regler/app-regel-tester', component: RegelTesterComponent },
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
    exports: [RouterModule]
})

export class AppRoutingModule {
 }
