import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ViewProcedurerComponent} from './view-procedurer/view-procedurer.component';

const routes: Routes = [
  { path: 'procedurer', component: ViewProcedurerComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
    exports: [RouterModule]
})

export class AppRoutingModule {
 }
