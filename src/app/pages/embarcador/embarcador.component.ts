import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Renderer2,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { interval as observableInterval } from 'rxjs';
import { takeWhile, scan, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import {DecimalPipe} from '@angular/common'
import { SortType } from '@swimlane/ngx-datatable/esm2015/public-api';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
const electron = (<any>window).require('electron');

import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AlertService } from 'src/app/shared/services/general/alert.service';
import { InputFormComponent } from 'src/app/shared/components/input-form/input-form.component';
import { EmbarcadorService } from 'src/app/shared/services/embarcador.service';
import { EditarEmpresaComponent } from 'src/app/shared/components/empresa/editar-empresa/editar-empresa.component';
@Component({
  selector: 'app-embarcador',
  templateUrl: './embarcador.component.html',
  styleUrls: ['./embarcador.component.scss']
})
export class EmbarcadorComponent implements OnInit {

  @ViewChild('pRef', { static: false }) pRef: ElementRef;
  SelectStatus: InputFormComponent;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('footer', { static: false }) footer: FooterComponent;
  rows = {
    correo: "",
    direccion: "",
    idEmbarcador: 1,
    nombreEmpresa: "",
    pbx: ""
  };
 
  constructor(
    private renderer: Renderer2,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _ngZone: NgZone,
    private cdRef: ChangeDetectorRef,
    private AlertService: AlertService,
    private EmbarcadorService:EmbarcadorService,
    public dialog: MatDialog
  ) { 

    this.getEmbarcador();
  }

  ngOnInit(): void {
  }

  getEmbarcador(){
    this.EmbarcadorService.embarcador();
    electron.ipcRenderer.on('allEmbarcadores', (event: any, data: any) => {
      if (data['res']) {
        console.log(data);
        this.rows = data['embarcadores'][0];
        console.log(this.rows);
        this.spinner.hide();
        this.cdRef.detectChanges();
      }
    });
  }
  /*Método que controla el DOM del aplicativo*/
  updateContent(e:any) {
    if (e) {
      this.renderer.setStyle(this.pRef.nativeElement, 'margin-left', '65px');
      this.footer.update(e);
    } else {
      this.footer.update(e);
      this.renderer.setStyle(this.pRef.nativeElement, 'margin-left', '250px');
    }
  }

  /*Método que controla el scroll*/
  scrollToTop(el:any) {
    const duration = 600;
    const interval = 5;
    const move = (el.scrollTop * interval) / duration;
    observableInterval(interval)
      .pipe(
        scan((acc, curr) => acc - move, el.scrollTop),
        tap((position) => (el.scrollTop = position)),
        takeWhile((val) => val > 0)
      )
      .subscribe();
  }
add(){
  let dialogRef = this.dialog.open(EditarEmpresaComponent, {
    height: '550px',
    width: '450px',
    data: {empresa:this.rows},
  });
  dialogRef.afterClosed().subscribe((result) => {
    this.spinner.show();
    this.getEmbarcador();
  });
}
}
