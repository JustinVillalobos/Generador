import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Renderer2,
  NgZone,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { interval as observableInterval } from 'rxjs';
import { takeWhile, scan, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DecimalPipe } from '@angular/common';
import { SortType } from '@swimlane/ngx-datatable/esm2015/public-api';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
const electron = (<any>window).require('electron');
import { ReportesService } from 'src/app/shared/services/reportes.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AlertService } from 'src/app/shared/services/general/alert.service';
import { InputFormComponent } from 'src/app/shared/components/input-form/input-form.component';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { EmbarcadorService } from 'src/app/shared/services/embarcador.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-generar-reporte',
  templateUrl: './generar-reporte.component.html',
  styleUrls: ['./generar-reporte.component.scss'],
})
export class GenerarReporteComponent implements OnInit {
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

  items = [];
  inputvalue: String = '';
  public clienteFilterCtrl: FormControl = new FormControl();
  public clienteCtrl: FormControl = new FormControl();
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  protected _onDestroy = new Subject<void>();
  /** list of banks filtered by search keyword */
  public filteredClientes: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  productos = [];
  inputvalue2: String = '';
  public productosFilterCtrl: FormControl = new FormControl();
  public productosCtrl: FormControl = new FormControl();
  @ViewChild('singleSelect2', { static: true }) singleSelect2: MatSelect;
  @ViewChild('inputCliente', { static: true }) inputCliente: InputFormComponent;
  @ViewChild('inputProducto', { static: true })
  inputProducto: InputFormComponent;

  @ViewChild('direccion', { static: true }) direccion: InputFormComponent;
  @ViewChild('correo', { static: true }) correo: InputFormComponent;
  @ViewChild('telefono', { static: true }) telefono: InputFormComponent;
  @ViewChild('nombre', { static: true }) nombre: InputFormComponent;

  @ViewChild('cantidad', { static: true }) cantidad: InputFormComponent;
  @ViewChild('bultos', { static: true }) bultos: InputFormComponent;
  @ViewChild('fob', { static: true }) fobInput: InputFormComponent;

  @ViewChild('numFactura', { static: true }) numFactura: InputFormComponent;
  @ViewChild('nombreEmb', { static: true }) nombreEmb: InputFormComponent;
  @ViewChild('flete', { static: true }) flete: InputFormComponent;
  @ViewChild('seguro', { static: true }) seguro: InputFormComponent;
  @ViewChild('otros', { static: true }) otros: InputFormComponent;
  @ViewChild('totalFacturado', { static: true })
  totalFacturado: InputFormComponent;
  protected _onDestroy2 = new Subject<void>();
  /** list of banks filtered by search keyword */
  public filteredProductos: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  producto = {
    idProducto: '',
    descripcion: '',
    cantidad: '',
    bultos: '',
    fob: 0,
  };
  productosSeleccionados = [];
  reporte = {
    idReporte: 0,
    idConsignatario: 0,
    idEmbarcador: 0,
    nombre: '',
    idFactura: '',
    tasa: 1.375,
    flete: 0,
    seguro: 0,
    fob: 0,
    otros: 0,
    totalNeto: 0,
    totalBruto: 0,
    totalFactura: 0,
    consignatario: {},
    empresa: {},
    productos: [],
  };
  cliente = {
    idConsignatario: 0,
    nombreEmpresa: '',
    direccion: '',
    correo: '',
    telefono: '',
    nombre: '',
  };
  totalBruto = 0;
  totalNeto = 0;
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
  empresa = {
    idEmbarcador: 0,
    correo: '',
    direccion: '',
    nombreEmpresa: '',
    pbx: '',
  };
  cantidadProductos = 0;
  cantidadBultos = 0;
  totalFlete = 0;
  totalSeguro = 0;
  totalOtros = 0;
  totalFob = 0;
  constructor(
    private renderer: Renderer2,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _ngZone: NgZone,
    private cdRef: ChangeDetectorRef,
    private AlertService: AlertService,
    public dialog: MatDialog,
    public decimalPipe: DecimalPipe,
    private ReportesService: ReportesService,
    private ProductosService: ProductosService,
    private EmbarcadorService: EmbarcadorService
  ) {
    this.spinner.show();
    //this.temp = this.rows;
    this.allClientes();
    this.allProductos();
    this.getEmbarcador();
  }
  ngOnInit(): void {}
  ngAfterViewInit() {
    this.setInitialValue();
  }
  getEmbarcador() {
    this.EmbarcadorService.embarcador();
    electron.ipcRenderer.on('allEmbarcadores', (event: any, data: any) => {
      if (data['res']) {
        this.empresa = data['embarcadores'][0];
      }
    });
  }
  allClientes() {
    this.ReportesService.allClientes();
    electron.ipcRenderer.on('Clientes', (event: any, data: any) => {
      if (data['res']) {
        console.log(data);
        this.items = data['clientes'];
        this.clienteCtrl.setValue(this.items[10]);

        // load the initial bank list
        this.filteredClientes.next(this.items.slice());

        // listen for search field value changes
        this.clienteFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterClientes();
          });
        this.spinner.hide();
        this.cdRef.detectChanges();
      }
    });
  }
  allProductos() {
    this.ProductosService.allProductos();
    electron.ipcRenderer.on('allProductos', (event: any, data: any) => {
      if (data['res']) {
        console.log(data);
        this.productos = data['productos'];
        console.log(data);
        this.productosCtrl.setValue(this.items[10]);

        // load the initial bank list
        this.filteredProductos.next(this.productos.slice());

        // listen for search field value changes
        this.productosFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy2))
          .subscribe(() => {
            this.filterProductos();
          });
        this.spinner.hide();
      }
    });
  }
  /**
   * Sets the initial value after the filteredClientes are loaded initially
   */
  protected setInitialValue() {
    this.filteredClientes
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: any, b: any) =>
          a && b && a.id === b.id;
      });
    this.filteredProductos
      .pipe(take(1), takeUntil(this._onDestroy2))
      .subscribe(() => {
        this.singleSelect2.compareWith = (a: any, b: any) =>
          a && b && a.id === b.id;
      });
  }

  protected filterClientes() {
    if (!this.items) {
      return;
    }
    // get the search keyword
    let search = this.clienteFilterCtrl.value;
    if (!search) {
      this.filteredClientes.next(this.items.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    const f = this.items.filter(function (d) {
      if (
        d.nombreEmpresa != '' &&
        d.nombreEmpresa != null &&
        d.nombreEmpresa != undefined
      ) {
        return (
          d.nombreEmpresa.toLowerCase().indexOf(search) !== -1 ||
          d.correo.toLowerCase().indexOf(search) !== -1
        );
      } else {
        return true;
      }
    });
    console.log(search, this.items, f);
    this.filteredClientes.next(f);
  }
  protected filterProductos() {
    if (!this.productos) {
      return;
    }
    // get the search keyword
    let search = this.productosFilterCtrl.value;
    if (search.length == 0) {
      this.filteredProductos.next(this.productos.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    const f = this.productos.filter(function (d) {
      if (
        d.descripcion != '' &&
        d.descripcion != null &&
        d.descripcion != undefined
      ) {
        return d.descripcion.toLowerCase().indexOf(search) !== -1;
      } else {
        return true;
      }
    });
    console.log(search, this.productos, f);
    this.filteredProductos.next(f);
  }
  updateSelectProductos(e) {
    this.inputProducto.setText(this.productosCtrl.value + '');
    this.singleSelect2.value = '';
    //this.productosFilterCtrl.setValue(this.inputvalue2);
    this.producto.descripcion = this.productosCtrl.value + '';
  }
  updateSelectClientes(e) {
    console.log(this.clienteCtrl.value);
    //this.clienteFilterCtrl.setValue(this.inputvalue);
    this.cliente.nombreEmpresa = this.clienteCtrl.value + '';

    let clienteTemp = this.items.filter((res) => {
      return res.nombreEmpresa == this.cliente.nombreEmpresa;
    });

    if (clienteTemp.length >= 1) {
      //this.cliente = clienteTemp[0];
      this.inputCliente.setText(clienteTemp[0].nombreEmpresa);
      this.correo.setText(clienteTemp[0].correo);
      this.direccion.setText(clienteTemp[0].direccion);
      this.telefono.setText(clienteTemp[0].telefono);
      this.nombre.setText(clienteTemp[0].nombre);
      localStorage.setItem('cliente', JSON.stringify(clienteTemp[0]));
    }
    this._ngZone.run(() => {
      this.cdRef.detectChanges();
    });
  }
  /*Método que controla el DOM del aplicativo*/
  updateContent(e: any) {
    if (e) {
      this.renderer.setStyle(this.pRef.nativeElement, 'margin-left', '65px');
      this.footer.update(e);
    } else {
      this.footer.update(e);
      this.renderer.setStyle(this.pRef.nativeElement, 'margin-left', '250px');
    }
  }
  /*Método que controla el renderizado de celda en la tabla para centrado*/
  getCellClass({ row, column, value }: any): any {
    let amount = 1;
    return {
      amount: amount === 1,
    };
  }
  /*Método que controla los Inputs*/
  updateValue(e: any) {
    let val = e.value;
    val = val.toLowerCase();
    if (val != '' && val != ' ') {
      const f = this.temp.filter(function (d) {
        if (
          d.descripcion != '' &&
          d.descripcion != null &&
          d.descripcion != undefined
        ) {
          return d.descripcion.toLowerCase().indexOf(val) !== -1;
        } else {
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
  updateInputs(e: any) {
    if (e.name == 'cantidad') {
      this.producto.cantidad = e.value;
    } else if (e.name == 'Bultos') {
      this.producto.bultos = e.value;
    } else if (e.name == 'correo') {
      this.cliente.correo = e.value;
    } else if (e.name == 'telefono') {
      this.cliente.telefono = e.value;
    } else if (e.name == 'nombre') {
      this.cliente.nombre = e.value;
    } else if (e.name == 'nombreEmpresa') {
      this.cliente.nombreEmpresa = e.value;
    } else if (e.name == 'direccion') {
      this.cliente.direccion = e.value;
    } else if (e.name == 'idFactura') {
      this.reporte.idFactura = e.value;
    } else if (e.name == 'nombreEmbarcador') {
      this.reporte.nombre = e.value;
    } else if (e.name == 'typeTasa') {
      if (e.value == 'Terrestre') {
        this.reporte.tasa = 1.375;
      } else {
        this.reporte.tasa = 1.65;
      }
    } else if (e.name == 'flete') {
      this.reporte.flete = e.value;
    } else if (e.name == 'otros') {
      this.reporte.otros = e.value;
    } else if (e.name == 'fob') {
      this.producto.fob = e.value;
    } else if (e.name == 'seguroCustom') {
      this.reporte.seguro = e.value;
    } else if (e.name == 'totalFactura') {
      this.reporte.totalFactura = e.value;
    }
    /* if(this.reporte.tasa!=0 && this.reporte.totalFactura!=0){
      console.log(this.reporte.seguro ,(parseFloat(this.reporte.flete+"")+parseFloat(this.reporte.totalFactura+"")),parseFloat(this.reporte.tasa+""),parseFloat(this.reporte.totalFactura+""));
      this.reporte.seguro  = (parseFloat(this.reporte.flete+"")+parseFloat(this.reporte.totalFactura+""))*this.reporte.tasa;
    }*/
    console.log(this.reporte);
  }
  /*Método que controla select por estado*/
  updateShow() {
    this._ngZone.run(() => {
      this.cdRef.detectChanges();
    });
  }
  setPage(pageInfo: any, optional: any, container?: any) {}
  /*Método que controla el scroll*/
  scrollToTop(el: any) {
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
  updateSelect(e) {}
  calculate() {
    /** */
    let total = 0;
    this.productosSeleccionados.forEach((e, index) => {
      console.log(
        this.reporte.seguro,
        this.productosSeleccionados[index].total,
        this.totalBruto
      );
      let multiSeguro =
        this.productosSeleccionados[index].total *
        parseInt(this.reporte.flete + '');
      console.log(
        'MULTI:' + multiSeguro / parseFloat(this.totalBruto + ''),
        parseFloat(this.totalBruto + '')
      );
      this.productosSeleccionados[index].flete =
        (this.productosSeleccionados[index].total *
          parseFloat(this.reporte.flete + '')) /
        parseFloat(this.totalBruto + '');
      this.productosSeleccionados[index].seguro =
        (this.productosSeleccionados[index].total *
          parseFloat(this.reporte.seguro + '')) /
        parseFloat(this.totalBruto + '');
      this.totalFob = this.totalFob + this.productosSeleccionados[index].fob;
      this.totalSeguro =
        this.totalSeguro + this.productosSeleccionados[index].seguro;
      this.totalFlete =
        this.totalFlete + this.productosSeleccionados[index].flete;
      this.cantidadProductos =
        parseInt(this.cantidadProductos + '') +
        parseInt(this.productosSeleccionados[index].cantidad);
      this.cantidadBultos =
        parseInt(this.cantidadBultos + '') +
        parseInt(this.productosSeleccionados[index].bultos);
      if (this.reporte.otros + ''.length > 1) {
        this.productosSeleccionados[index].otros =
          (this.productosSeleccionados[index].total *
            parseFloat(this.reporte.otros + '')) /
          parseFloat(this.totalBruto + '');
        this.totalOtros =
          this.totalOtros + this.productosSeleccionados[index].otros;
      }
    });
    console.log('dd>' + this.cantidadProductos, this.cantidadBultos);
  }
  addProduct() {
    let producto = this.productos.filter((res) => {
      return res.descripcion == this.producto.descripcion;
    });
    console.log(this.producto, producto);
    if (
      producto.length >= 1 &&
      this.producto.cantidad.length >= 1 &&
      this.producto.bultos.length >= 1
    ) {
      this.producto.idProducto = producto[0].idProducto;
      let isAdd = false;
      this.totalNeto = 0;
      this.totalBruto = 0;
      this.totalFob = 0;
      this.totalSeguro = 0;
      this.totalFlete = 0;
      this.totalOtros = 0;
      this.cantidadProductos = 0;
      this.cantidadBultos = 0;
      this.productosSeleccionados.forEach((element, index) => {
        if (element.idProducto == this.producto.idProducto) {
          isAdd = true;

          this.AlertService.alertaError('Producto ya seleccionado');
        }
        this.totalNeto =
          this.totalNeto + this.productosSeleccionados[index].totalNeto;
        this.totalBruto =
          this.totalBruto + this.productosSeleccionados[index].total;
      });
      if (isAdd == false) {
        let newProducto = {
          idProducto: this.producto.idProducto,
          descripcion: this.producto.descripcion,
          cantidad: this.producto.cantidad,
          bultos: this.producto.bultos,
          peso_neto: producto[0].peso_neto,
          peso_bruto: producto[0].peso_bruto,
          total: parseInt(this.producto.cantidad) * producto[0].peso_bruto,
          totalNeto: parseInt(this.producto.cantidad) * producto[0].peso_neto,
          flete: 0,
          seguro: 0,
          fob: parseInt(this.producto.fob + ''),
          otros: 0,
        };
        this.productosSeleccionados.push(newProducto);
        this.totalNeto = this.totalNeto + newProducto.totalNeto;
        this.totalBruto = this.totalBruto + newProducto.total;
        this.calculate();
      }
    } else {
      this.AlertService.alertaError('Faltan datos que ingresar');
    }
    this.producto.fob = 0;
    this.cantidad.setText('');
    this.bultos.setText('');
    this.fobInput.setText('');
    this.inputProducto.setText('');
    this.producto.cantidad = '';
    this.producto.bultos = '';
  }
  removeItem(index) {
    this.totalNeto =
      this.totalNeto - this.productosSeleccionados[index].totalNeto;
    this.totalBruto =
      this.totalBruto - this.productosSeleccionados[index].total;
    this.cantidadProductos = 0;
    this.cantidadBultos = 0;
    this.totalFob = 0;
    this.totalSeguro = 0;
    this.totalFlete = 0;
    console.log('Nuevos totales', this.totalBruto, this.totalNeto);
    this.totalFlete = 0;
    let newArray = this.productosSeleccionados.splice(index, 1);
    this.productosSeleccionados.forEach((e, index) => {
      console.log(
        this.reporte.seguro,
        this.productosSeleccionados[index].total,
        this.totalBruto
      );
      let multiSeguro =
        this.productosSeleccionados[index].total *
        parseInt(this.reporte.flete + '');
      console.log(
        'MULTI:' + multiSeguro / parseFloat(this.totalBruto + ''),
        parseFloat(this.totalBruto + '')
      );
      this.productosSeleccionados[index].flete =
        (this.productosSeleccionados[index].total *
          parseFloat(this.reporte.flete + '')) /
        parseFloat(this.totalBruto + '');
      this.productosSeleccionados[index].seguro =
        (this.productosSeleccionados[index].total *
          parseFloat(this.reporte.seguro + '')) /
        parseFloat(this.totalBruto + '');
      this.totalFob = this.totalFob + this.productosSeleccionados[index].fob;
      this.totalSeguro =
        this.totalSeguro + this.productosSeleccionados[index].seguro;
      this.totalFlete =
        this.totalFlete + this.productosSeleccionados[index].flete;
      this.cantidadProductos =
        parseInt(this.cantidadProductos + '') +
        parseInt(this.productosSeleccionados[index].cantidad);
      this.cantidadBultos =
        parseInt(this.cantidadBultos + '') +
        parseInt(this.productosSeleccionados[index].bultos);
      if (this.reporte.otros + ''.length > 1) {
        this.productosSeleccionados[index].otros =
          (this.productosSeleccionados[index].total *
            parseFloat(this.reporte.otros + '')) /
          parseFloat(this.totalBruto + '');
        this.totalOtros =
          this.totalOtros + this.productosSeleccionados[index].otros;
      }
    });
    console.log(newArray, this.cantidadProductos, this.cantidadBultos);
  }
  editItem(row, index) {
    this.totalNeto =
      this.totalNeto - this.productosSeleccionados[index].totalNeto;
    this.totalBruto =
      this.totalBruto - this.productosSeleccionados[index].total;
    this.cantidadProductos = 0;
    this.cantidadBultos = 0;
    this.totalFob = 0;
    this.totalSeguro = 0;
    this.totalFlete = 0;
    console.log('Nuevos totales', this.totalBruto, this.totalNeto);
    this.totalFlete = 0;
    let newArray = this.productosSeleccionados.splice(index, 1);
    this.productosSeleccionados.forEach((e, index) => {
      console.log(
        this.reporte.seguro,
        this.productosSeleccionados[index].total,
        this.totalBruto
      );
      let multiSeguro =
        this.productosSeleccionados[index].total *
        parseInt(this.reporte.flete + '');
      console.log(
        'MULTI:' + multiSeguro / parseFloat(this.totalBruto + ''),
        parseFloat(this.totalBruto + '')
      );
      this.productosSeleccionados[index].flete =
        (this.productosSeleccionados[index].total *
          parseFloat(this.reporte.flete + '')) /
        parseFloat(this.totalBruto + '');
      this.productosSeleccionados[index].seguro =
        (this.productosSeleccionados[index].total *
          parseFloat(this.reporte.seguro + '')) /
        parseFloat(this.totalBruto + '');
      this.totalFob = this.totalFob + this.productosSeleccionados[index].fob;
      this.totalSeguro =
        this.totalSeguro + this.productosSeleccionados[index].seguro;
      this.totalFlete =
        this.totalFlete + this.productosSeleccionados[index].flete;
      this.cantidadProductos =
        parseInt(this.cantidadProductos + '') +
        parseInt(this.productosSeleccionados[index].cantidad);
      this.cantidadBultos =
        parseInt(this.cantidadBultos + '') +
        parseInt(this.productosSeleccionados[index].bultos);
      if (this.reporte.otros + ''.length > 1) {
        this.productosSeleccionados[index].otros =
          (this.productosSeleccionados[index].total *
            parseFloat(this.reporte.otros + '')) /
          parseFloat(this.totalBruto + '');
        this.totalOtros =
          this.totalOtros + this.productosSeleccionados[index].otros;
      }
    });
    console.log(row);
    this.cantidad.setText(row.cantidad);
    this.bultos.setText(row.bultos);
    this.fobInput.setText(row.fob);
    this.inputProducto.setText(row.descripcion);
    this.producto.cantidad = row.cantidad;
    this.producto.bultos = row.bultos;
  }
  /*Método que convierte JSON en datos para el pdf*/
  convertedData(data) {
    let converted_data = [];
    for (let i = 0; i < data.length; i++) {
      let data_simplex = [
        {
          content: data[i].descripcion,
          styles: { halign: 'center', lineWidth: 0 },
        },
        {
          content: data[i].cantidad,
          styles: { halign: 'center', lineWidth: 0 },
        },
        { content: 'Piezas', styles: { halign: 'center', lineWidth: 0 } },
        { content: data[i].bultos, styles: { halign: 'center', lineWidth: 0 } },
        {
          content: parseFloat(data[i].total + '').toFixed(2),
          styles: { halign: 'center', lineWidth: 0 },
        },
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
  save() {
    this.cliente = JSON.parse(localStorage.getItem('cliente'));

    this.reporte.consignatario = this.cliente;
    this.reporte.empresa = this.empresa;
    this.reporte.productos = this.productosSeleccionados;
    this.reporte.totalBruto = this.totalBruto;
    this.reporte.totalNeto = this.totalNeto;
    let contadorErrores = 0;
    let errores = '';
    if (this.reporte.consignatario == undefined) {
      contadorErrores++;
      this.AlertService.alertaError('Cliente no seleccionado');
      return;
    }

    if (this.reporte.productos.length == 0) {
      contadorErrores++;
      this.AlertService.alertaError('Productos no seleccionado');
      return;
    }
    if (this.reporte.idFactura.length == 0) {
      contadorErrores++;
      errores += 'Campo idFactura Requerido<br>';
    }
    if (this.reporte.idFactura.length > 25) {
      contadorErrores++;
      errores += 'Campo factura  con demasiados caracteres<br>';
    }
    if (this.reporte.nombre.length == 0) {
      contadorErrores++;
      errores += 'Campo Nombre Requerido<br>';
    }
    if (this.reporte.nombre.length > 25) {
      contadorErrores++;
      errores += 'Campo Nombre  con demasiados caracteres<br>';
    }
    if (this.reporte.totalFactura + ''.length == 0) {
      contadorErrores++;
      errores += 'Campo Total Factura Requerido<br>';
    }
    if (this.reporte.flete + ''.length == 0) {
      contadorErrores++;
      errores += 'Campo Flete Requerido<br>';
    }

    if (contadorErrores > 0) {
      this.AlertService.alertaError(errores);
      return;
    }

    console.log(this.reporte);
    this.spinner.show();
    this.ReportesService.addReport(this.reporte);
    electron.ipcRenderer.on('saveReporte', (event: any, data: any) => {
      console.log(data);
      if (data['res']) {
        //this.empresa = data['embarcadores'][0];
        this.spinner.hide();
        this.AlertService.alertTimeCorrect(
          'Información guardada con éxito',
          function (_component) {
            _component.print();
          },
          this
        );
      } else {
        this.spinner.hide();
        this.AlertService.alertaError('Codigo de factura repetido');
      }
    });
    //
  }
  print() {
    console.log(this.producto, this.cliente);
    let data_formmated = this.convertedData(this.productosSeleccionados);
    let date = new Date();

    var doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    doc.setTextColor(0, 0, 0);
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
    doc.text(text, doc.internal.pageSize.width - 47, 35);
    if (this.reporte.idFactura.length >= 1) {
      text = this.reporte.idFactura;
      doc.text(text, doc.internal.pageSize.width - 47, 40);
    }
    let image = new Image();
    image.src = 'assets/logo.png';
    doc.addImage(image, 'png', 15, 23, 50, 15);
    doc.setFont('times', 'bold');
    doc.setFontSize(12);
    text = 'Fecha:';
    textPostion = this.center(doc, text);
    doc.text(text, textPostion - 50, 55);
    doc.setFont('times', 'normal');
    let month = date.getMonth();
    let monthString = '';
    switch (month) {
      case 0:
        monthString = 'Enero';
        break;
      case 1:
        monthString = 'Febrero';
        break;
      case 2:
        monthString = 'Mayo';
        break;
      case 3:
        monthString = 'Abril';
        break;
      case 4:
        monthString = 'Mayo';
        break;
      case 5:
        monthString = 'Junio';
        break;
      case 6:
        monthString = 'Julio';
        break;
      case 7:
        monthString = 'Agosto';
        break;
      case 8:
        monthString = 'Septiembre';
        break;
      case 9:
        monthString = 'Octubre';
        break;
      case 10:
        monthString = 'Noviembre';
        break;
      case 11:
        monthString = 'Diciembre';
        break;
    }
    text = 'Guatemala, ' + monthString + ' de ' + date.getFullYear();
    textPostion = this.center(doc, text);
    doc.text(text, textPostion - 15, 55);
    let indexEmpresa = 80;
    let marginX = 15;
    let increment = 5;
    doc.setFont('times', 'bold');
    text = 'Embarcador:';
    doc.text(text, marginX, indexEmpresa);
    doc.setFont('times', 'normal');
    indexEmpresa = indexEmpresa + increment;
    text = this.empresa.nombreEmpresa;
    doc.text(text, marginX, indexEmpresa);
    let maxLineWidth = 60;
    indexEmpresa = indexEmpresa + increment;
    doc.setFontSize(10);
    text = this.empresa.direccion;
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(textLines, marginX, indexEmpresa);
    doc.setFontSize(12);
    indexEmpresa = indexEmpresa + increment + 10;
    text = 'PBX: ' + this.empresa.pbx;
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(textLines, marginX, indexEmpresa);

    indexEmpresa = indexEmpresa + increment;
    text = '' + this.reporte.nombre;
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(textLines, marginX, indexEmpresa);

    indexEmpresa = indexEmpresa + increment;
    doc.setTextColor(107, 39, 243);
    text = 'Email: ' + this.empresa.correo;
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(text, marginX, indexEmpresa);
    doc.setFillColor(107, 39, 243);
    doc.line(marginX, indexEmpresa + 1, text.length * 2 + 10, indexEmpresa + 1);
    doc.setFillColor(255, 255, 255);
    doc.setTextColor(0, 0, 0);

    indexEmpresa = 80;
    doc.setFont('times', 'bold');
    marginX = 120;
    text = 'Consignatario:';
    doc.text(text, marginX, indexEmpresa);
    doc.setFont('times', 'normal');
    indexEmpresa = indexEmpresa + increment;
    text = this.cliente.nombreEmpresa;
    doc.text(text, marginX, indexEmpresa);
    maxLineWidth = 60;
    indexEmpresa = indexEmpresa + increment;
    doc.setFontSize(10);
    text = this.cliente.direccion;
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(textLines, marginX, indexEmpresa);
    doc.setFontSize(12);
    indexEmpresa = indexEmpresa + increment + 10;
    text = 'Tel: ' + this.cliente.telefono;
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(textLines, marginX, indexEmpresa);

    indexEmpresa = indexEmpresa + increment;
    text = '' + this.cliente.nombre;
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(textLines, marginX, indexEmpresa);

    indexEmpresa = indexEmpresa + increment;
    doc.setTextColor(107, 39, 243);
    text = 'Email: ' + this.cliente.correo;
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(text, marginX, indexEmpresa);
    doc.setFillColor(107, 39, 243);
    doc.line(120, indexEmpresa + 1, 185, indexEmpresa + 1);
    doc.setFillColor(255, 255, 255);
    doc.setTextColor(0, 0, 0);

    indexEmpresa = indexEmpresa + increment + 5;
    marginX = 15;
    doc.line(marginX, indexEmpresa, pageWidth - marginX, indexEmpresa);
    marginX = 120;
    indexEmpresa = 160;
    data_formmated.forEach((element) => {
      indexEmpresa = indexEmpresa + 5;
    });
    console.log(indexEmpresa);
    indexEmpresa = indexEmpresa + 15;
    text = 'Total Neto: ' + parseFloat(this.totalNeto + '').toFixed(2);
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(text, marginX, indexEmpresa);
    indexEmpresa = indexEmpresa + 5;
    text = 'Total Bruto: ' + parseFloat(this.totalBruto + '').toFixed(2);
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(text, marginX, indexEmpresa);

    marginX = 15;
    if (indexEmpresa < 235) {
      indexEmpresa = 240;
    } else {
      indexEmpresa = indexEmpresa + 5;
    }

    doc.line(marginX, indexEmpresa + 1, 90, indexEmpresa + 1);
    indexEmpresa = indexEmpresa + 4;
    text = '' + this.reporte.nombre;
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(textLines, marginX + 20, indexEmpresa);
    indexEmpresa = indexEmpresa + 4;
    text = '' + this.empresa.nombreEmpresa;
    doc.setFont('times', 'bold');
    var textLines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(textLines, marginX + 15, indexEmpresa);
    doc.setFont('times', 'normal');
    // doc.line(marginX, 250+1, 90, 250+1);
    doc.setFontSize(11);
    (doc as any).autoTable({
      head: this.head,
      styles: { fontSize: 8 },
      body: data_formmated,
      margin: { left: 15, right: 15 },
      theme: 'striped',
      startY: 130,
      linWidth: 0,
      lineColor: [255, 255, 255],
      didDrawCell: (data) => {
        //console.log(data.column.index)
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
    });

    //doc = this.addFooters(doc);
    doc
      .save('Reporte ' + date + '.pdf', { returnPromise: true })
      .then((res) => {
        console.log(res);
        this.producto = {
          idProducto: '',
          descripcion: '',
          cantidad: '',
          bultos: '',
          fob: 0,
        };
        this.productosSeleccionados = [];
        this.reporte = {
          idReporte: 0,
          idConsignatario: 0,
          idEmbarcador: 0,
          nombre: '',
          idFactura: '',
          tasa: 1.375,
          flete: 0,
          seguro: 0,
          fob: 0,
          otros: 0,
          totalNeto: 0,
          totalBruto: 0,
          totalFactura: 0,
          consignatario: {},
          empresa: {},
          productos: [],
        };
        this.cliente = {
          idConsignatario: 0,
          nombreEmpresa: '',
          direccion: '',
          correo: '',
          telefono: '',
          nombre: '',
        };
        this.totalBruto = 0;
        this.totalNeto = 0;
        this.cantidadProductos = 0;
        this.cantidadBultos = 0;
        this.totalFob = 0;
        this.totalSeguro = 0;
        this.totalFlete = 0;
        this.totalOtros = 0;
        this.cantidad.setText('');
        this.bultos.setText('');
        this.fobInput.setText('');
        this.inputProducto.setText('');
        this.inputCliente.setText('');
        this.correo.setText('');
        this.direccion.setText('');
        this.telefono.setText('');
        this.nombre.setText('');
        this.singleSelect.value = '';
        this.flete.setText('');
        this.otros.setText('');
        this.seguro.setText('');
        this.numFactura.setText('');
        this.totalFacturado.setText('');
        this.nombreEmb.setText('');
      });
  }
}
