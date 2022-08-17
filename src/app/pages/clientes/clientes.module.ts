import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsModule } from "src/app/materials.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { AddClientesComponent } from 'src/app/shared/components/clientes/add-clientes/add-clientes.component';
import { EditClientesComponent } from 'src/app/shared/components/clientes/edit-clientes/edit-clientes.component';


@NgModule({
  declarations: [
    ClientesComponent,
    AddClientesComponent,
    EditClientesComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MaterialsModule,
    ComponentsModule,
    NgxSpinnerModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientesModule { }
