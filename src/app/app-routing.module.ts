import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'medidas',
    loadChildren: () => import('./pages/medidas/medidas.module').then(m => m.MedidasModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/productos/productos.module').then(m => m.ProductosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
