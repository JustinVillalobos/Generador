import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ValidationsService } from 'src/app/shared/services/general/validations.service';
import { AlertService } from 'src/app/shared/services/general/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
const electron = (<any>window).require('electron');
import { MedidasService } from 'src/app/shared/services/medidas.service';
@Component({
  selector: 'app-add-medida',
  templateUrl: './add-medida.component.html',
  styleUrls: ['./add-medida.component.scss']
})
export class AddMedidaComponent implements OnInit {

  
  medida:any = {
    descripcion:""
  }
  isInvalidDescripcion: boolean = false;
  errorInputDescripcion: string = '';
  constructor(
    private dialog: MatDialog,
    private validation: ValidationsService,
    private AlertService: AlertService,
    private MedidasService: MedidasService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }
  updateValue(e:any) {
    console.log(e);
    this.medida.descripcion = e.value;
  }

  save(){
    this.MedidasService.addMedida(this.medida);
      electron.ipcRenderer.on('addMedida', (event: any, data: any) => {
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
