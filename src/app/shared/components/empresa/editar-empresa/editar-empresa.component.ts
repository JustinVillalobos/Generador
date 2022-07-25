
import { Component, OnInit, Inject ,ChangeDetectorRef,NgZone} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ValidationsService } from 'src/app/shared/services/general/validations.service';
import { AlertService } from 'src/app/shared/services/general/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
const electron = (<any>window).require('electron');
import { EmbarcadorService } from 'src/app/shared/services/embarcador.service';
@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.scss']
})
export class EditarEmpresaComponent implements OnInit {
  empresa = {
    correo: "",
    direccion: "",
    idEmbarcador: 1,
    nombreEmpresa: "",
    pbx: ""
  }
  isInvalidDescripcion: boolean = false;
  errorInputDescripcion: string = '';
  constructor( private dialog: MatDialog,
    private validation: ValidationsService,
    private AlertService: AlertService,
    private EmbarcadorService: EmbarcadorService,
    private spinner: NgxSpinnerService,
    private cdRef: ChangeDetectorRef,
    private _ngZone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
      console.log(this.data);
      this.empresa.idEmbarcador = this.data.empresa.idEmbarcador;
      this.empresa.correo = this.data.empresa.correo;
      this.empresa.direccion = this.data.empresa.direccion;
      this.empresa.nombreEmpresa = this.data.empresa.nombreEmpresa;
      this.empresa.pbx = this.data.empresa.pbx;
     }

  ngOnInit(): void {
  }

  updateValue(e:any) {
    if(e.name == "nombreEmpresa"){
      this.empresa.nombreEmpresa = e.value;
    }else if(e.name == "direccion"){
      this.empresa.direccion = e.value;
    }else if(e.name == "pbx"){
      this.empresa.pbx = e.value;
    }else{
      this.empresa.correo = e.value;
    }
  
  }

  save(){
    this.EmbarcadorService.updateEmbarcador(this.empresa);
      electron.ipcRenderer.on('updateEmbarcador', (event: any, data: any) => {
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
