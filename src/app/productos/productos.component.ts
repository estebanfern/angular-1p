import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../service/productos.service';
import { Producto } from '../model/producto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  providers: [ProductosService],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  selectedProducto: Producto = { idProducto: 0, nombre: '' }; // Inicializa un nuevo producto vacío
  p: number = 1;


  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.productos = this.productosService.getProductos();
  }

  onSubmit(): void {
    if (this.selectedProducto.idProducto) {
      // Actualizar producto existente
      this.productosService.updateProducto(this.selectedProducto);
    } else {
      // Agregar nuevo producto
      this.productosService.addProducto(this.selectedProducto);
    }
    this.resetForm();
    this.loadProductos();
  }

  editProducto(producto: Producto): void {
    this.selectedProducto = { ...producto }; // Copia los valores del producto seleccionado
  }

  resetForm(): void {
    this.selectedProducto = { idProducto: 0, nombre: '' }; // Restablece el formulario a un nuevo producto vacío
  }

  deleteProducto(id: number): void {
    this.productosService.deleteProducto(id);
    this.loadProductos();
  }
}
