import { Injectable } from '@angular/core';
const electron = (<any>window).require('electron');
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor() { }
  allProductos() {
    electron.ipcRenderer.send('allProductos');
  }
  addProducto(data:any) {
    electron.ipcRenderer.send('addProducto',data);
  }
 updateProducto(data:any) {
    electron.ipcRenderer.send('updateProducto',data);
  }
}
