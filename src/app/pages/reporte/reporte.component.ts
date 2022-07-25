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

import { ReportesService } from 'src/app/shared/services/reportes.service';
@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  @ViewChild('pRef', { static: false }) pRef: ElementRef;
  SelectStatus: InputFormComponent;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('footer', { static: false }) footer: FooterComponent;
  rows = [];
  columns = [{ prop: 'name' }];
  temp = [];
  temp2 = [];
  pageNumber = 0;
  limit = 10;
  page = {
    totalElements: 0,
    totalPages: 0,
    pageNumber: 0,
    min: 0,
    max: this.limit - 1,
  };
  constructor(
    private renderer: Renderer2,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _ngZone: NgZone,
    private cdRef: ChangeDetectorRef,
    private AlertService: AlertService,
    private ReportesService:ReportesService,
    public dialog: MatDialog,
    public decimalPipe:DecimalPipe
  ) { 
    this.spinner.show();
    this.temp = this.rows;
    this.allProductos();
  }
  ngOnInit(): void {
  }

  allProductos(){
    this.ReportesService.allReportes();
    electron.ipcRenderer.on('allReportes', (event: any, data: any) => {
      if (data['res']) {
        console.log(data);
        this.rows = data['reportes'];
        this.temp = this.rows;
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
  /*Método que controla el renderizado de celda en la tabla para centrado*/
  getCellClass({ row, column, value }:any): any {
    let amount = 1;
    return {
      amount: amount === 1,
    };
  }
  /*Método que controla los Inputs*/
  updateValue(e:any) {
    let val = e.value;
    val = val.toLowerCase();
    if (val != '' && val != ' ') {
      const f = this.temp.filter(function (d) {
        if (d.descripcion != '' && d.descripcion!=null && d.descripcion!=undefined) {
          return (
              d.descripcion.toLowerCase().indexOf(val) !== -1 
            );
         
        }else{
          return true;
        }
      });
      this.rows = f;
      this.pageNumber = 0;
    } else {
      this.rows = this.temp;
      this.pageNumber = 0;
    }
  }
  /*Método que controla select por estado*/
  updateShow(e:any) {
    this.limit = parseInt(e.value, 10);
    this.setPage({ offset: 0 }, false);

    this.table.limit = parseInt(e.value, 10);
    this.table.recalculate();
    setTimeout(() => {
      if (this.table.bodyComponent.temp.length <= 0) {
        this.table.offset = Math.floor(
          (this.table.rowCount - 1) / this.table.limit
        );
        // this.table.offset = 0;
      }
    });
  }
  setPage(pageInfo:any, optional:any, container?:any) {
    let flag = false;
    this.rows = [];
    this.page.totalElements = this.temp.length;
    this.page.min = pageInfo.offset * this.limit;
    this.page.max = this.page.min + this.limit;
    if (this.page.max > this.temp.length) {
      this.page.max = this.temp.length;
    }
    for (let i = this.page.min; i < this.page.max; i++) {
      this.rows.push(this.temp[i]);
    }
    if (optional) {
      this.scrollToTop(container);
    }

    this.cdRef.detectChanges();
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
    this._ngZone.run(() => {
      this.router.navigate(['/generar']);
    });
  }
  view(data){
    this._ngZone.run(() => {
      this.router.navigate(['/ver']);
    });
  }
  print(data){

  }

}
