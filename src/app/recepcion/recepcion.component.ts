import { Component } from '@angular/core';
import { RecepcionService } from '../service/recepcion.service';
import { AVAILABLE_TIMES, Time } from '../model/time';
import { Recepcion, Estado } from '../model/recepcion';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { JaulasService } from '../service/jaulas.service';
import { ProveedoresService } from '../service/proveedores.service';
import { TimeFormatPipe } from '../pipe/timeFormat';
import { ProductosService } from '../service/productos.service';
import { Producto } from '../model/producto';

@Component({
  selector: 'app-recepcion',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  providers: [RecepcionService, JaulasService, ProveedoresService, TimeFormatPipe, ProductosService],
  templateUrl: './recepcion.component.html',
  styleUrl: './recepcion.component.css'
})
export class RecepcionComponent {


  times : Time[] = AVAILABLE_TIMES;
  recepciones : Recepcion[] = [];
  productos : Producto[] = [];
  selectedRecepcion : Recepcion = new Recepcion();
  p: number = 1;
  pp: number = 1;
  Estado = Estado

  constructor(public recepcionService: RecepcionService, public jaulaService: JaulasService, public proveedorService: ProveedoresService, private productoService : ProductosService) {
  }

  ngOnInit(): void {
    this.recepciones = this.recepcionService.get();
    this.productos = this.productoService.getProductos();
  }

  load(): void {
    this.recepciones = this.recepcionService.get();
    this.productos = this.productoService.getProductos();
  }

  onSubmit(): void {
    this.recepcionService.add(this.selectedRecepcion);
    this.load();
    this.resetForm();
  }

  resetForm(): void {
    this.selectedRecepcion = new Recepcion();
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
    this.selectedRecepcion = this.recepcionService.getById(id) ?? new Recepcion();
  }

  recepcionar(id: number): void {
    this.recepcionService.recepcionar(id);
    this.load();
  }

  completar(id: number): void {
    this.recepcionService.completar(id);
    this.load();
  }

  getFormattedTime(time: Time) {
    return time.toString();
  }

}
