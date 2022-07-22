import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedidasRoutingModule } from './medidas-routing.module';
import { MaterialsModule } from "src/app/materials.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MedidasComponent } from './medidas.component';
@NgModule({
  declarations: [
    MedidasComponent
  ],
  imports: [
    CommonModule,
    MedidasRoutingModule,
    MaterialsModule,
    ComponentsModule,
    NgxSpinnerModule,
    NgxDatatableModule
  ]
})
export class MedidasModule { }
