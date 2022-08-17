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
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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
  head = [
    [
      { content: 'Producto', styles: { halign: 'center', lineWidth: 0 } },
      { content: 'Cantidad', styles: { halign: 'center', lineWidth: 0 } },
      { content: 'Medida', styles: { halign: 'center', lineWidth: 0 } },
      { content: 'Bultos', styles: { halign: 'center', lineWidth: 0 } },
      { content: 'Total Peso', styles: { halign: 'center', lineWidth: 0 } },
     // { content: 'Flete', styles: { halign: 'center', lineWidth: 0 } },
    //  { content: 'Seguro', styles: { halign: 'center', lineWidth: 0 } },
    //  { content: 'Fob', styles: { halign: 'center', lineWidth: 0 } },
    //  { content: 'Otros', styles: { halign: 'center', lineWidth: 0 } },
    ],
  ];
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
		console.log(data);
      if (data['res']) {
        console.log(data);
        this.rows = data['reportes'];

        this.rows.forEach((element,i) => {
          const date = new Date(this.rows[i].fechaCreacion);
          var dateStr =
          ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
          ("00" + date.getDate()).slice(-2) + "/" +
          date.getFullYear() + " " +
          ("00" + date.getHours()).slice(-2) + ":" +
          ("00" + date.getMinutes()).slice(-2) + ":" +
          ("00" + date.getSeconds()).slice(-2);
            this.rows[i].fechaCreacion =dateStr ;
        });
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
    console.log(data);
    let count=0;
    this.ReportesService.reporteById(data.idReporte);
    electron.ipcRenderer.on('reporteById', (event: any, data: any) => {
      electron.ipcRenderer.removeAllListeners('reporteById');
      count++;
      if(count<=1){
        console.log(data);
        this.printPDF(data['reportes']);
      }
      
      });
  }
  convertedData(data) {
    let converted_data = [];
    for (let i = 0; i < data.length; i++) {
      let data_simplex = [
        { content: data[i].descripcion, styles: { halign: 'center',lineWidth:0 } },
        { content: data[i].cantidad, styles: { halign: 'center',lineWidth:0 } },
        { content: "Piezas", styles: { halign: 'center',lineWidth:0 } },
        { content: data[i].bultos, styles: { halign: 'center',lineWidth:0 } },
        { content:parseFloat(data[i].bruto+'').toFixed(2) , styles: { halign: 'center',lineWidth:0 } }
      ];
      converted_data.push(data_simplex);
    }
  

    return converted_data;
  }
/*Método que controla el centrar un elemento en pdf*/
  center(doc, text) {
    var textWidth =
      (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    var textOffset = (doc.internal.pageSize.width - textWidth) / 2;
    return textOffset;
  }
  /*Método que agrega paginación al pdf */
  addFooters(doc) {
    const pageCount = doc.internal.getNumberOfPages();

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(
        'Página ' + String(i) + ' de ' + String(pageCount),
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.getHeight() - 5,
        {
          align: 'center',
        }
      );
    }
    return doc;
  }
  printPDF(data){
    
    let data_formmated = this.convertedData(data);
    let date = new Date();
    let productosSeleccionados = data;
    var doc = new jsPDF({orientation: 'p',
    unit: 'mm',
    format: 'a4',});
    doc.setTextColor(0,0,0);
    data = data[0];
    var pageHeight =
      doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth =
      doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    let wantedTableWidth = 100;
    let margin = (pageWidth - wantedTableWidth) / 2;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    let text = 'PACKING LIST';
    let textPostion = this.center(doc, text);
    doc.text(text, (doc.internal.pageSize.width-47), 35);
    if(data.idFactura.length>=1){
      text = data.idFactura;
      doc.text(text, (doc.internal.pageSize.width-47), 40);
    }
    let image = new Image();
    image.src ="assets/logo.png";
    doc.addImage(image,'png',15,23,50,15);
    doc.setFont('times', 'bold');
    doc.setFontSize(12);
    text = 'Fecha:';
    textPostion = this.center(doc, text);
    doc.text(text, textPostion-50, 55);
    doc.setFont('times', 'normal');
    let month= date.getMonth();
    let monthString="";
    switch(month){
      case 0:
        monthString="Enero";
      break;
      case 1:
        monthString="Febrero";
      break;
      case 2:
        monthString="Mayo";
      break;
      case 3:
        monthString="Abril";
      break;
      case 4:
        monthString="Mayo";
      break;
      case 5:
        monthString="Junio";
      break;
      case 6:
        monthString="Julio";
      break;
      case 7:
        monthString="Agosto";
      break;
      case 8:
        monthString="Septiembre";
      break;
      case 9:
        monthString="Octubre";
      break;
      case 10:
        monthString="Noviembre";
      break;
      case 11:
        monthString="Diciembre";
      break;
    }
    text = 'Guatemala, '+monthString+" de "+date.getFullYear();
    textPostion = this.center(doc, text);
    doc.text(text, textPostion-20, 55);
    let indexEmpresa=80;
    let marginX=15;
    let increment = 5;
    doc.setFont('times', 'bold');
    text ="Embarcador:";
    doc.text(text, marginX, indexEmpresa);
    doc.setFont('times', 'normal');
    indexEmpresa=indexEmpresa+increment;
    text =data.empresa.nombreEmpresa;
    doc.text(text, marginX, indexEmpresa);
    let maxLineWidth = 60;
    indexEmpresa=indexEmpresa+increment;
    text =data.empresa.direccion;
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(textLines, marginX, indexEmpresa);

    indexEmpresa=indexEmpresa+increment+10;
    text ="PBX: "+data.empresa.pbx;
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(textLines, marginX, indexEmpresa);

    indexEmpresa=indexEmpresa+increment;
    text =""+data.nombreEmbarcador;
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(textLines, marginX, indexEmpresa);

    indexEmpresa=indexEmpresa+increment;
    doc.setTextColor(107, 39, 243);
    text ="Email: "+data.empresa.correo;
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(text, marginX, indexEmpresa);
    doc.setFillColor(107, 39, 243);
    doc.line(marginX, indexEmpresa+1, (text.length*2)+10, indexEmpresa+1);
    doc.setFillColor(255, 255, 255);
    doc.setTextColor(0,0,0);


    indexEmpresa=80;
    doc.setFont('times', 'bold');
    marginX = 120;
    text ="Consignatario:";
    doc.text(text, marginX, indexEmpresa);
    doc.setFont('times', 'normal');
    indexEmpresa=indexEmpresa+increment;
    text =data.consignatario.nombreEmpresa;
    doc.text(text, marginX, indexEmpresa);
     maxLineWidth = 60;
    indexEmpresa=indexEmpresa+increment;
    text =data.consignatario.direccion;
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(textLines, marginX, indexEmpresa);

    indexEmpresa=indexEmpresa+increment+10;
    text ="Tel: "+data.consignatario.telefono;
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(textLines, marginX, indexEmpresa);

    indexEmpresa=indexEmpresa+increment;
    text =""+data.consignatario.nombre;
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(textLines, marginX, indexEmpresa);

    indexEmpresa=indexEmpresa+increment;
    doc.setTextColor(107, 39, 243);
    text ="Email: "+data.consignatario.correo;
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(text, marginX, indexEmpresa);
    doc.setFillColor(107, 39, 243);
    doc.line(120, indexEmpresa+1, 185, indexEmpresa+1);
    doc.setFillColor(255, 255, 255);
    doc.setTextColor(0,0,0);



    indexEmpresa=indexEmpresa+increment+5;
    marginX=15;
    doc.line(marginX, indexEmpresa, pageWidth-marginX, indexEmpresa);
    marginX=120;
    indexEmpresa = 160;
    productosSeleccionados.forEach(element => {
      indexEmpresa=indexEmpresa+10;
    });
    console.log(indexEmpresa);
    text ="Total Neto: "+parseFloat(data.totalNeto+'').toFixed(2);
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(text, marginX, indexEmpresa);
    indexEmpresa = indexEmpresa+5;
    text ="Total Bruto: "+parseFloat(data.totalBruto+'').toFixed(2);
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(text, marginX, indexEmpresa);

    marginX=15;
    indexEmpresa=240;
    doc.line(marginX, indexEmpresa+1, 90, indexEmpresa+1);
    indexEmpresa = indexEmpresa+4;
    text =""+data.nombreEmbarcador;
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(textLines, marginX+20, indexEmpresa);
    indexEmpresa = indexEmpresa+4;
    text =""+data.empresa.nombreEmpresa;
    doc.setFont('times', 'bold');
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(textLines, marginX+15, indexEmpresa);
    doc.setFont('times', 'normal');

    doc.setFontSize(11);
    (doc as any).autoTable({
      head: this.head,
      body: data_formmated,
      margin: { left: 15, right: 15 },
      theme: 'striped',
      startY: 130,
      linWidth:0,
      lineColor:[255,255,255],
      didDrawCell: (data) => {
        //console.log(data.column.index)
      },
      headStyles:{
        fillColor:[255,255,255],
        textColor:[0,0,0]
      }
    });
   
    //doc = this.addFooters(doc);
    doc.save('Reporte ' + date + '.pdf');
  }

}
