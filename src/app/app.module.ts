import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MedidasModule } from './pages/medidas/medidas.module';
import { ProductosModule } from './pages/productos/productos.module';
import { ReporteModule } from './pages/reporte/reporte.module';
import { ClientesModule } from './pages/clientes/clientes.module';
// Interceptors



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MedidasModule,
    ProductosModule,
    ReporteModule,
    ClientesModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
