import { Component, ElementRef, ViewChild } from '@angular/core';
import { RecepcionService } from '../service/recepcion.service';
import { AVAILABLE_TIMES, Time } from '../model/time';
import { Recepcion, Estado, Detalle } from '../model/recepcion';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { JaulasService } from '../service/jaulas.service';
import { ProveedoresService } from '../service/proveedores.service';
import { TimeFormatPipe } from '../pipe/timeFormat';
import { ProductosService } from '../service/productos.service';
import { Producto } from '../model/producto';
import { Modal } from 'bootstrap';
import { Jaula } from '../model/jaula';

@Component({
  selector: 'app-recepcion',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  providers: [RecepcionService, JaulasService, ProveedoresService, TimeFormatPipe, ProductosService],
  templateUrl: './recepcion.component.html',
  styleUrl: './recepcion.component.css'
})
export class RecepcionComponent {

  selectedJaulaId: number | null = null;
  times : Time[] = AVAILABLE_TIMES;
  recepciones : Recepcion[] = [];
  productos : Producto[] = [];
  detalles: Detalle[] = [];
  selectedRecepcion : Recepcion = new Recepcion();
  p: number = 1;
  pp: number = 1;
  Estado = Estado
  viewId: number = 0;
  jaulas : Jaula[] = [];
  viewRecepcion: Recepcion = new Recepcion();

  @ViewChild('recepcionarModal') recepcionarModal!: ElementRef;
  @ViewChild('detallesModal') detallesModal!: ElementRef;

  constructor(public recepcionService: RecepcionService, public jaulaService: JaulasService, public proveedorService: ProveedoresService, private productoService : ProductosService) {
  }

  ngOnInit(): void {
    this.recepciones = this.recepcionService.get();
    this.productos = this.productoService.getProductos();
    this.jaulas = this.jaulaService.getJaulasDisponibles();
  }

  load(): void {
    this.recepciones = this.recepcionService.get();
    this.productos = this.productoService.getProductos();
  }

  loadProducts(): void {
    this.productos = this.productoService.getProductos();
  }

  loadJaulas(): void {
    this.jaulas = this.jaulaService.getJaulasDisponibles();
  }

  onSubmit(): void {
    this.selectedRecepcion.detalles = this.detalles;
    this.recepcionService.add(this.selectedRecepcion);
    this.load();
    this.resetForm();
    this.resetDetalles();
  }

  resetForm(): void {
    this.selectedRecepcion = new Recepcion();
  }

  resetDetalles(): void {
    this.detalles = [];
  }

  add(recepcion: Recepcion): void {
    this.recepcionService.add(recepcion);
    this.recepciones = this.recepcionService.get();
  }

  delete(id: number): void {
    this.recepcionService.delete(id);
    this.recepciones = this.recepcionService.get();
  }

  verDetalles(id: number): void {
    this.viewRecepcion = this.recepcionService.getById(id) ?? new Recepcion();
    const modalElement = new Modal(this.detallesModal.nativeElement);
    modalElement.show();
  }

  recepcionarViewModal(idTurno: number): void {
    this.viewId = idTurno;
    const modalElement = new Modal(this.recepcionarModal.nativeElement);
    modalElement.show();
  }

  recepcionar(id: number, jaulaId: number): void {
    this.recepcionService.recepcionar(id, jaulaId);
    this.jaulaService.ocuparJaula(jaulaId);
    this.load();
    this.selectedJaulaId = null;
  }

  completar(id: number): void {
    let recepcion = this.recepcionService.getById(id);
    this.jaulaService.desocuparJaula(recepcion?.idJaula ?? 0);
    this.recepcionService.completar(id);
    this.load();
  }

  getFormattedTime(time: Time) {
    return time.toString();
  }

  hasProducto(productoId: number): boolean {
    if (this.detalles) {
      return this.detalles.some(d => d.idProducto === productoId);
    }
    return false;
  }

  addProducto(productoId: number, cantidad: number): void {
    if (!this.detalles) {
      this.detalles = [];
    }
    this.detalles.push({
      idDetalle: this.generateDetalleId(),
      cantidad : cantidad,
      idProducto: productoId,
    });
  }

  getCantidadFromDetalle(productoId: number): number {
    const detalle = this.detalles.find(d => d.idProducto === productoId);
    return detalle ? detalle.cantidad : 0;
  }

  removeProducto(productoId: number): void {
    this.detalles = this.detalles.filter(d => d.idProducto !== productoId);
  }

  private generateDetalleId(): number {
    if (!this.detalles) {
      this.detalles = [];
    }
    return this.detalles.length > 0 ? Math.max(...this.detalles.map(p => p.idDetalle)) + 1 : 1;
  }

}
