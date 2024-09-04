import { Injectable } from '@angular/core';
import { Estado, Recepcion } from '../model/recepcion';
import { Time } from '../model/time';

@Injectable({
  providedIn: 'root'
})
export class RecepcionService {

  private localStorageKey = 'recepciones';

  constructor() { }

  // Create
  add(recepcion: Recepcion): void {
    console.log(recepcion);
    recepcion.estado = Estado.PENDIENTE;
    const recepciones = this.get();
    recepcion.idTurno = this.generateId(recepciones);
    recepciones.push(recepcion);
    this.set(recepciones);
  }

  // Read
  get(): Recepcion[] {
    const proveedoresJson = localStorage.getItem(this.localStorageKey);
    return proveedoresJson ? JSON.parse(proveedoresJson) : [];
  }

  getById(id: number): Recepcion | undefined {
    const recepciones = this.get();
    return recepciones.find(p => p.idTurno === id);
  }

  // Delete
  delete(id: number): void {
    let recepciones = this.get();
    recepciones = recepciones.filter(p => p.idTurno !== id);
    this.set(recepciones);
  }

  // Private helper methods
  private set(recepciones: Recepcion[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(recepciones));
  }

  private generateId(recepciones: Recepcion[]): number {
    return recepciones.length > 0 ? Math.max(...recepciones.map(p => p.idTurno)) + 1 : 1;
  }

  getBadgeColor(estado: Estado): string {
    switch (estado) {
      case Estado.COMPLETADO:
        return 'success';
      case Estado.EN_RECEPCION:
        return 'info';
      case Estado.PENDIENTE:
          return 'warning';
      default:
        return 'secondary';
    }
  }

  getText(estado: Estado): string {
    switch (estado) {
      case Estado.COMPLETADO:
        return 'Completado';
      case Estado.EN_RECEPCION:
        return 'En recepción';
      case Estado.PENDIENTE:
        return 'Pendiente';
      default:
        return 'Desconocido';
    }
  }

  recepcionar(id: number) {
    let recepciones = this.get();
    let now = new Date();
    const recepcion = recepciones.find(p => p.idTurno === id);
    if (recepcion) {
      recepcion.horaInicioRecepcion = `${now.getHours()}:${now.getMinutes()}`;
      recepcion.estado = Estado.EN_RECEPCION;
      this.set(recepciones);
    }
  }

  completar(id: number) {
    let recepciones = this.get();
    let now = new Date();
    const recepcion = recepciones.find(p => p.idTurno === id);
    if (recepcion) {
      recepcion.horaFinRecepcion = `${now.getHours()}:${now.getMinutes()}`;
      recepcion.estado = Estado.COMPLETADO;
      this.set(recepciones);
    }
  }

  hasProducto(id: number, productoId: number): boolean {
    const recepcion = this.getById(id);
    if (recepcion) {
      return recepcion.detalles.some(d => d.idProducto === productoId);
    }
    return false;
  }

  addProducto(id: number, productoId: number, cantidad: number): void {
    const recepcion = this.getById(id);
    if (recepcion) {
      recepcion.detalles.push({
        idDetalle: this.generateDetalleId(recepcion),
        cantidad : cantidad,
        idProducto: productoId,
      });
      this.set(this.get().map(r => r.idTurno === id ? recepcion : r));
    }
  }

  private generateDetalleId(recepcion: Recepcion): number {
    if (!recepcion.detalles) {
      recepcion.detalles = [];
    }
    return recepcion.detalles.length > 0 ? Math.max(...recepcion.detalles.map(p => p.idDetalle)) + 1 : 1;
  }

}
