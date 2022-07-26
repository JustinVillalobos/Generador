import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedidasRoutingModule } from './medidas-routing.module';
import { MaterialsModule } from "src/app/materials.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MedidasComponent } from './medidas.component';
import { AddMedidaComponent } from 'src/app/shared/components/medidas/add-medida/add-medida.component';
import { EditMedidaComponent } from 'src/app/shared/components/medidas/edit-medida/edit-medida.component';

@NgModule({
  declarations: [
    MedidasComponent,
    AddMedidaComponent,
    EditMedidaComponent
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
