import { Injectable } from '@angular/core';
const electron = (<any>window).require('electron');
@Injectable({
  providedIn: 'root'
})
export class EmbarcadorService {

  constructor() { }
  embarcador(){
    electron.ipcRenderer.send('allEmbarcadores');
  }
  updateEmbarcador(data){
    electron.ipcRenderer.send('updateEmbarcador',data);
  }
}
