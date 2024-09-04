import { Injectable } from '@angular/core';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private localStorageKey = 'productos';

  constructor() { }

  // Create
  addProducto(producto: Producto): void {
    const productos = this.getProductos();
    producto.idProducto = this.generateId(productos);
    productos.push(producto);
    this.setProductos(productos);
  }

  // Read
  getProductos(): Producto[] {
    const productosJson = localStorage.getItem(this.localStorageKey);
    return productosJson ? JSON.parse(productosJson) : [];
  }

  getProductoById(id: number): Producto | undefined {
    const productos = this.getProductos();
    return productos.find(p => p.idProducto === id);
  }

  // Update
  updateProducto(updatedProducto: Producto): void {
    const productos = this.getProductos();
    const index = productos.findIndex(p => p.idProducto === updatedProducto.idProducto);
    if (index !== -1) {
      productos[index] = updatedProducto;
      this.setProductos(productos);
    }
  }

  // Delete
  deleteProducto(id: number): void {
    let productos = this.getProductos();
    productos = productos.filter(p => p.idProducto !== id);
    this.setProductos(productos);
  }

  // Private helper methods
  private setProductos(productos: Producto[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(productos));
  }

  private generateId(productos: Producto[]): number {
    return productos.length > 0 ? Math.max(...productos.map(p => p.idProducto)) + 1 : 1;
  }

}
