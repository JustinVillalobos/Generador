import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ValidationsService } from 'src/app/shared/services/general/validations.service';
import { AlertService } from 'src/app/shared/services/general/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
const electron = (<any>window).require('electron');
import { ReportesService } from '../../../services/reportes.service';
@Component({
  selector: 'app-add-clientes',
  templateUrl: './add-clientes.component.html',
  styleUrls: ['./add-clientes.component.scss']
})
export class AddClientesComponent implements OnInit {

  clientes:any = {
    nombreEmpresa:"",
    direccion:"",
    correo:"",
    telefono:"",
    nombre:""

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
    private ReportesService: ReportesService,
    private spinner: NgxSpinnerService,
    private cdRef: ChangeDetectorRef,
  ) {
    
   }

  ngOnInit(): void {
  }
 
  updateValue(e:any) {
    console.log(e);
    if(e.name == "nombreEmpresa"){
      this.clientes.nombreEmpresa = e.value;
    }else if(e.name =="direccion"){
      this.clientes.direccion = e.value;
    }else if(e.name =="correo"){
      this.clientes.correo = e.value;
    }else if(e.name =="telefono"){
      this.clientes.telefono = e.value;
    }else if(e.name =="nombre"){
      this.clientes.nombre = e.value;
    }
  }
  updateSelect(e){

  }
  save(){
    let cantidadErrores=0;
    let errores="";
    if( this.clientes.nombreEmpresa.length==0){
      cantidadErrores++;
      errores+="Campo Nombre de Empresa requerido<br>";
    }
    if( this.clientes.nombreEmpresa.length>150){
      cantidadErrores++;
      errores+="Campo Nombre de Empresa  con demasiados caracteres<br>";
    }
    if( this.clientes.nombre.length>100){
      cantidadErrores++;
      errores+="Campo Nombre  con demasiados caracteres<br>";
    }
    if( this.clientes.nombre.length==0){
      cantidadErrores++;
      errores+="Campo Nombre requerido<br>";
    }
    
    if( this.clientes.direccion.length==0){
      cantidadErrores++;
      errores+="Campo Dirección requerido<br>";
    }
    if( this.clientes.direccion.length>200){
      cantidadErrores++;
      errores+="Campo Dirección  con demasiados caracteres<br>";
    }
    if( this.clientes.telefono.length==0){
      cantidadErrores++;
      errores+="Campo telefono requerido<br>";
    }
    if( this.clientes.telefono.length>25){
      cantidadErrores++;
      errores+="Campo telefono  con demasiados caracteres<br>";
    }
    if( this.clientes.correo.length==0){
      cantidadErrores++;
      errores+="Campo correo requerido<br>";
    }
    if( this.clientes.correo.length>25){
      cantidadErrores++;
      errores+="Campo correo  con demasiados caracteres<br>";
    }
    if(cantidadErrores>0){
      this.AlertService.alertaError(errores);
      return;
    }
    this.ReportesService.addCliente({'consignatario':this.clientes});
      electron.ipcRenderer.on('addCliente', (event: any, data: any) => {
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