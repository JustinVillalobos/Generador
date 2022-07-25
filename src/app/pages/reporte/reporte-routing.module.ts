import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteComponent } from './reporte.component';
import { GenerarReporteComponent } from './generar-reporte/generar-reporte.component';
import { VerReporteComponent } from './ver-reporte/ver-reporte.component';
const routes: Routes = [
  {
    path:"",
    component:ReporteComponent
  },
  {
    path: 'generar',
    component: GenerarReporteComponent
  },
  {
    path: 'ver',
    component: VerReporteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteRoutingModule { }
