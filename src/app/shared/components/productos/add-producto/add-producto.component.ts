import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ValidationsService } from 'src/app/shared/services/general/validations.service';
import { AlertService } from 'src/app/shared/services/general/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
const electron = (<any>window).require('electron');
import { ProductosService } from 'src/app/shared/services/productos.service';
import { MedidasService } from 'src/app/shared/services/medidas.service';
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
    private spinner: NgxSpinnerService,
    private cdRef: ChangeDetectorRef,
    private MedidasService:MedidasService
  ) {
    this.allMedidas();
   }

  ngOnInit(): void {
  }
  allMedidas(){
    this.MedidasService.allMedidas();
    electron.ipcRenderer.on('allMedidas', (event: any, data: any) => {
      if (data['res']) {
        console.log(data);
        this.items = data['medidas'];
        this.cdRef.detectChanges();
      }
    });
  }
  updateValue(e:any) {
    console.log(e);
    if(e.name == "descripcion"){
      this.producto.descripcion = e.value;
    }else if(e.name =="peso_neto"){
      this.producto.peso_neto = e.value;
    }else if(e.name =="peso_bruto"){
      this.producto.peso_bruto = e.value;
    }
  }
  updateSelect(e){

  }
  save(){
    let cantidadErrores=0;
    let errores="";
    if( this.producto.descripcion.length==0){
      cantidadErrores++;
      errores+="Campo descripción requerido<br>";
    }
    if( this.producto.descripcion.length>125){
      cantidadErrores++;
      errores+="Campo descripción con demasiados caracteres<br>";
    }
    if( this.producto.peso_neto+"".length==0){
      cantidadErrores++;
      errores+="Campo peso neto requerido<br>";
    }
    if( this.producto.peso_neto+"".length>30){
      cantidadErrores++;
      errores+="Campo peso neto con demasiados caracteres<br>";
    }
    if( this.producto.peso_bruto+"".length==0){
      cantidadErrores++;
      errores+="Campo peso bruto requerido<br>";
    }
    if( this.producto.peso_bruto+"".length>30){
      cantidadErrores++;
      errores+="Campo peso bruto con demasiados caracteres<br>";
    }
    if(cantidadErrores>0){
      this.AlertService.alertaError(errores);
      return;
    }
    this.ProductosService.addProducto(this.producto);
      electron.ipcRenderer.on('addProducto', (event: any, data: any) => {
        if (data['res']) {
          this.spinner.hide();
          this.AlertService.alertTimeCorrect(
            'Información guardada con éxito',
            function (_component) {
              _component.dialog.closeAll();
            },
            this
          );
        }
      });
  }

}
