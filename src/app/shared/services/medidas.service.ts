import { Injectable } from '@angular/core';
const electron = (<any>window).require('electron');
@Injectable({
  providedIn: 'root'
})
export class MedidasService {

  constructor() { }
  allMedidas() {
    electron.ipcRenderer.send('allMedidas');
  }
  addMedida(data:any) {
    electron.ipcRenderer.send('addMedida',data);
  }
 updateMedida(data:any) {
    electron.ipcRenderer.send('editMedida',data);
  }
}
