import { Injectable } from '@angular/core';
import { Jaula, Uso } from '../model/jaula';

@Injectable({
  providedIn: 'root'
})
export class JaulasService {

  private localStorageKey = 'jaulas';

  constructor() { }

  // Create
  add(jaula: Jaula): void {
    const jaulas = this.get();
    jaula.idJaula = this.generateId(jaulas);
    jaulas.push(jaula);
    this.set(jaulas);
  }

  // Read
  get(): Jaula[] {
    const proveedoresJson = localStorage.getItem(this.localStorageKey);
    return proveedoresJson ? JSON.parse(proveedoresJson) : [];
  }

  getById(id: number): Jaula | undefined {
    const jaulas = this.get();
    return jaulas.find(p => p.idJaula === id);
  }

  // Update
  update(updateJaula: Jaula): void {
    const jaulas = this.get();
    const index = jaulas.findIndex(p => p.idJaula === updateJaula.idJaula);
    if (index !== -1) {
      jaulas[index] = updateJaula;
      this.set(jaulas);
    }
  }

  // Delete
  delete(id: number): void {
    let jaulas = this.get();
    jaulas = jaulas.filter(p => p.idJaula !== id);
    this.set(jaulas);
  }

  // Private helper methods
  private set(jaulas: Jaula[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(jaulas));
  }

  private generateId(jaulas: Jaula[]): number {
    return jaulas.length > 0 ? Math.max(...jaulas.map(p => p.idJaula)) + 1 : 1;
  }

  getBadgeColor(uso: Uso): string {
    switch (uso) {
      case Uso.S:
        return 'danger';
      case Uso.N:
        return 'success';
      default:
        return 'secondary';
    }
  }

  getText(uso: Uso): string {
    switch (uso) {
      case Uso.S:
        return 'Ocupado';
      case Uso.N:
        return 'Disponible';
      default:
        return 'Desconocido';
    }
  }

  getJaulasDisponibles(): Jaula[] {
    return this.get().filter(j => j.enUso === Uso.N);
  }

  getJaulasOcupadas(): Jaula[] {
    return this.get().filter(j => j.enUso === Uso.S);
  }

  ocuparJaula(id: number): void {
    let jaulas = this.get();
    const jaula = jaulas.find((r) => r.idJaula === id);
    if (jaula) {
      jaula.enUso = Uso.S;
      this.set(jaulas);
    }
  }

  desocuparJaula(id: number): void {
    let jaulas = this.get();
    const jaula = jaulas.find((r) => r.idJaula === id);
    if (jaula) {
      jaula.enUso = Uso.N;
      this.set(jaulas);
    }
  }

}
