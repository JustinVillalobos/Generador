import { Component, OnInit, Inject ,ChangeDetectorRef,NgZone} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ValidationsService } from 'src/app/shared/services/general/validations.service';
import { AlertService } from 'src/app/shared/services/general/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
const electron = (<any>window).require('electron');
import { MedidasService } from 'src/app/shared/services/medidas.service';
@Component({
  selector: 'app-edit-medida',
  templateUrl: './edit-medida.component.html',
  styleUrls: ['./edit-medida.component.scss']
})
export class EditMedidaComponent implements OnInit {

  medida:any = {
    idMedida:0,
    descripcion:""
  }
  isInvalidDescripcion: boolean = false;
  errorInputDescripcion: string = '';
  constructor(
    private dialog: MatDialog,
    private validation: ValidationsService,
    private AlertService: AlertService,
    private MedidasService: MedidasService,
    private spinner: NgxSpinnerService,
    private cdRef: ChangeDetectorRef,
    private _ngZone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
   // console.log(this.data,"Ingreso");
    this.medida.idMedida = this.data.idMedida;
    this.medida.descripcion= this.data.descripcion;
   setTimeout(() => {
    
   },100);
 
  }

  ngOnInit(): void {
   // console.log(this.data,"Ingreso");
    
  }
  updateValue(e:any) {
    this.medida.descripcion = e.value;
  }

  save(){
    this.MedidasService.updateMedida(this.medida);
      electron.ipcRenderer.on('editMedida', (event: any, data: any) => {
        console.log(data);
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
