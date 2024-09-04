import { Injectable } from '@angular/core';
import { Proveedor } from '../model/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private localStorageKey = 'proveedores';

  constructor() { }

  // Create
  addProveedor(proveedor: Proveedor): void {
    const proveedores = this.getProveedores();
    proveedor.idProveedor = this.generateId(proveedores);
    proveedores.push(proveedor);
    this.setProveedores(proveedores);
  }

  // Read
  getProveedores(): Proveedor[] {
    const proveedoresJson = localStorage.getItem(this.localStorageKey);
    return proveedoresJson ? JSON.parse(proveedoresJson) : [];
  }

  getProveedorById(id: number): Proveedor | undefined {
    const proveedores = this.getProveedores();
    return proveedores.find(p => p.idProveedor === id);
  }

  // Update
  updateProveedor(updatedProveedor: Proveedor): void {
    const proveedores = this.getProveedores();
    const index = proveedores.findIndex(p => p.idProveedor === updatedProveedor.idProveedor);
    if (index !== -1) {
      proveedores[index] = updatedProveedor;
      this.setProveedores(proveedores);
    }
  }

  // Delete
  deleteProveedor(id: number): void {
    let proveedores = this.getProveedores();
    proveedores = proveedores.filter(p => p.idProveedor !== id);
    this.setProveedores(proveedores);
  }

  // Private helper methods
  private setProveedores(proveedores: Proveedor[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(proveedores));
  }

  private generateId(proveedores: Proveedor[]): number {
    return proveedores.length > 0 ? Math.max(...proveedores.map(p => p.idProveedor)) + 1 : 1;
  }

}
