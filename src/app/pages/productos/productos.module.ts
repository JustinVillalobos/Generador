import { NgModule } from '@angular/core';
import { CommonModule,DecimalPipe } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { MaterialsModule } from "src/app/materials.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ProductosComponent } from './productos.component';
import { AddProductoComponent } from 'src/app/shared/components/productos/add-producto/add-producto.component';
import { EditProductoComponent } from 'src/app/shared/components/productos/edit-producto/edit-producto.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductosComponent,
    AddProductoComponent,
    EditProductoComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    MaterialsModule,
    ComponentsModule,
    NgxSpinnerModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ DecimalPipe],
})
export class ProductosModule { }
