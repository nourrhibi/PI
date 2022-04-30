import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SanteComponent} from "./sante.component";

const routes: Routes = [
  {
    path: '',
    component: SanteComponent,
    data: {
      title: 'santé'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SanteRoutingModule {}
