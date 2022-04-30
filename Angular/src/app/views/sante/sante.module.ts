import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';



import {SanteComponent} from "./sante.component";
import {SanteRoutingModule} from "./sante-routing.module";

@NgModule({
  imports: [
    SanteRoutingModule,

  ],
  declarations: [ SanteComponent ]
})
export class SanteModule { }
