import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmbarcadorRoutingModule } from './embarcador-routing.module';
import { MaterialsModule } from "src/app/materials.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditarEmpresaComponent } from 'src/app/shared/components/empresa/editar-empresa/editar-empresa.component';

import { EmbarcadorComponent } from './embarcador.component';
@NgModule({
  declarations: [
    EmbarcadorComponent,
    EditarEmpresaComponent

  ],
  imports: [
    CommonModule,
    EmbarcadorRoutingModule,
    MaterialsModule,
    ComponentsModule,
    NgxSpinnerModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmbarcadorModule { }
