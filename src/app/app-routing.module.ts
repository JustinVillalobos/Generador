import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'medidas',
    loadChildren: () => import('./pages/medidas/medidas.module').then(m => m.MedidasModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./pages/productos/productos.module').then(m => m.ProductosModule)
  },
  {
    path: 'empresa',
    loadChildren: () => import('./pages/embarcador/embarcador.module').then(m => m.EmbarcadorModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/reporte/reporte.module').then(m => m.ReporteModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
