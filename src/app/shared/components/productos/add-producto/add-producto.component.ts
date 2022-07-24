import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ValidationsService } from 'src/app/shared/services/general/validations.service';
import { AlertService } from 'src/app/shared/services/general/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
const electron = (<any>window).require('electron');
import { ProductosService } from 'src/app/shared/services/productos.service';
@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.scss']
})
export class AddProductoComponent implements OnInit {

  producto:any = {
    descripcion:"",
    peso_neto:0.0,
    peso_bruto:0.0,
    medida:{
      idMedida:0,
      descripcion:""
    }

  }
  isInvalidDescripcion: boolean = false;
  errorInputDescripcion: string = '';
  isInvalidPesoN: boolean = false;
  errorInputPesoN: string = '';

  isInvalidPesoB: boolean = false;
  errorInputPesoB: string = '';

  isInvalidMedida: boolean = false;
  errorInputMedida: string = '';
  items:any = [];
  constructor(
    private dialog: MatDialog,
    private validation: ValidationsService,
    private AlertService: AlertService,
    private ProductosService: ProductosService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }
  updateValue(e:any) {
    console.log(e);
    if(e.name == "descripcion"){

    }else if(e.name =="peso_neto"){

    }else if(e.name =="peso_bruto"){
      
    }
  }
  updateSelect(e){

  }
  save(){
    this.ProductosService.addProducto(this.producto);
      electron.ipcRenderer.on('addProducto', (event: any, data: any) => {
        if (data['res']) {
          this.spinner.hide();
          this.AlertService.alertTimeCorrect(
            'Información guardada con éxito',
            function (_component) {
              _component.medida.addMedida = '';
              _component.dialog.closeAll();
            },
            this
          );
        }
      });
  }

}
