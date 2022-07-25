import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmbarcadorComponent } from './embarcador.component';
const routes: Routes = [
  {
    path:"",
    component:EmbarcadorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmbarcadorRoutingModule { }
