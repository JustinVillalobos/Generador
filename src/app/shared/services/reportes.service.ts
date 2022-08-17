import { Injectable } from '@angular/core';
const electron = (<any>window).require('electron');
@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor() { }
  allReportes() {
    electron.ipcRenderer.send('allReportes');
  }
  allClientes(){
    electron.ipcRenderer.send('Clientes');
  }
  reporteById(d) {
    electron.ipcRenderer.send('reporteById',d);
  }
  
  addCliente(data){
    electron.ipcRenderer.send('addCliente',data);
  }
  addReport(data){
    electron.ipcRenderer.send('saveReporte',data);
  }
  updateCliente(data){
    electron.ipcRenderer.send('editCliente',data);
  }
}
