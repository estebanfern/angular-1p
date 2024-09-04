import { Injectable } from '@angular/core';
import { Proveedor } from '../model/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private localStorageKey = 'proveedores';

  constructor() { }

  // Create
  add(proveedor: Proveedor): void {
    const proveedores = this.get();
    proveedor.idProveedor = this.generateId(proveedores);
    proveedores.push(proveedor);
    this.set(proveedores);
  }

  // Read
  get(): Proveedor[] {
    const proveedoresJson = localStorage.getItem(this.localStorageKey);
    return proveedoresJson ? JSON.parse(proveedoresJson) : [];
  }

  getById(id: number): Proveedor | undefined {
    const proveedores = this.get();
    return proveedores.find(p => p.idProveedor === id);
  }

  // Update
  update(updatedProveedor: Proveedor): void {
    const proveedores = this.get();
    const index = proveedores.findIndex(p => p.idProveedor === updatedProveedor.idProveedor);
    if (index !== -1) {
      proveedores[index] = updatedProveedor;
      this.set(proveedores);
    }
  }

  // Delete
  delete(id: number): void {
    let proveedores = this.get();
    proveedores = proveedores.filter(p => p.idProveedor !== id);
    this.set(proveedores);
  }

  // Private helper methods
  private set(proveedores: Proveedor[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(proveedores));
  }

  private generateId(proveedores: Proveedor[]): number {
    return proveedores.length > 0 ? Math.max(...proveedores.map(p => p.idProveedor)) + 1 : 1;
  }

}
