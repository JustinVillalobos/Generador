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
}
