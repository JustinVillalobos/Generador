import { Component, OnInit ,ChangeDetectorRef,NgZone,Inject} from '@angular/core';
import { MatDialog ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ValidationsService } from 'src/app/shared/services/general/validations.service';
import { AlertService } from 'src/app/shared/services/general/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
const electron = (<any>window).require('electron');
import { ProductosService } from 'src/app/shared/services/productos.service';
import { MedidasService } from 'src/app/shared/services/medidas.service';
@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.scss']
})
export class EditProductoComponent implements OnInit {

  producto:any = {
    idProducto:0,
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
  selected :any = "";
  items:any = [];
  constructor(
    private dialog: MatDialog,
    private validation: ValidationsService,
    private AlertService: AlertService,
    private ProductosService: ProductosService,
    private spinner: NgxSpinnerService,
    private cdRef: ChangeDetectorRef,
    private MedidasService:MedidasService,
    private _ngZone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    console.log(data);
    this.producto.idProducto = this.data.producto.idProducto; 
    this.producto.descripcion = this.data.producto.descripcion; 
    this.producto.peso_neto = this.data.producto.peso_neto; 
    this.producto.peso_bruto = this.data.producto.peso_bruto; 
    this.selected =  this.data.producto.nombreMedida;
    this.spinner.show();
    this.allMedidas();
   }

  ngOnInit(): void {
  }
  allMedidas(){
    this.MedidasService.allMedidas();
    electron.ipcRenderer.on('allMedidas', (event: any, data: any) => {
      if (data['res']) {
        console.log(data);
        this.spinner.hide();
        this.items = data['medidas'];
        this.producto.medida.idMedida = this.data.producto.id; 
        console.log(this.producto,this.data);
        this.cdRef.detectChanges();
        setTimeout(() => {
          this.cdRef.detectChanges();
        },100);
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
    console.log("Ingreso click");
    this._ngZone.run(() => {
      this.cdRef.detectChanges();
      setTimeout(() => {
        this.cdRef.detectChanges();
      },100);
    });
  }

 
  save(){
    let object  = this.items.filter((res)=>{
      return res.descripcion == this.selected
    });
   
    this.producto.medida.idMedida = object[0].idMedida;
    console.log(object, this.producto);
    this.ProductosService.updateProducto(this.producto);
      electron.ipcRenderer.on('updateProducto', (event: any, data: any) => {
        console.log(data);
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
