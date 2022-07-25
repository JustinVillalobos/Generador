import { NgModule } from '@angular/core';
import { CommonModule,DecimalPipe } from '@angular/common';

import { ReporteRoutingModule } from './reporte-routing.module';
import { MaterialsModule } from "src/app/materials.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReporteComponent } from './reporte.component';
import { GenerarReporteComponent } from './generar-reporte/generar-reporte.component';
import { VerReporteComponent } from './ver-reporte/ver-reporte.component';
@NgModule({
  declarations: [
    ReporteComponent,
    GenerarReporteComponent,
    VerReporteComponent
  ],
  imports: [
    CommonModule,
    ReporteRoutingModule,
    MaterialsModule,
    ComponentsModule,
    NgxSpinnerModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[DecimalPipe]
})
export class ReporteModule { }
