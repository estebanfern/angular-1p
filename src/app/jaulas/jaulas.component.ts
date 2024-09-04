import { Component } from '@angular/core';
import { JaulasService } from '../service/jaulas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Jaula, Uso } from '../model/jaula';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-jaulas',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  providers: [JaulasService],
  templateUrl: './jaulas.component.html',
  styleUrl: './jaulas.component.css'
})
export class JaulasComponent {

  jaulas: Jaula[] = [];
  selectedJaula: Jaula = new Jaula();
  usos = Object.values(Uso);
  p: number = 1;
  filterTerm: string = '';

  constructor (public jaulaService: JaulasService) {
  }

  ngOnInit(): void {
    this.jaulas = this.jaulaService.get();
  }

  load(): void {
    this.jaulas = this.jaulaService.get();
  }

  onSubmit(): void {
    if (this.selectedJaula.idJaula) {
      // Actualizar jaula existente
      this.jaulaService.update(this.selectedJaula);
    } else {
      // Agregar nuevo jaula
      this.selectedJaula.enUso = Uso.N;
      this.jaulaService.add(this.selectedJaula);
    }
    this.load();
    this.resetForm();
  }

  edit(jaula: Jaula): void {
    this.selectedJaula = { ...jaula }; // Copia los valores del jaula seleccionado
  }

  resetForm(): void {
    this.selectedJaula = new Jaula();
  }

  add(jaula: Jaula): void {
    this.jaulaService.add(jaula);
    this.jaulas = this.jaulaService.get();
  }

  update(jaula: Jaula): void {
    this.jaulaService.update(jaula);
    this.jaulas = this.jaulaService.get();
  }

  delete(id: number): void {
    this.jaulaService.delete(id);
    this.jaulas = this.jaulaService.get();
  }

  get filteredJaulas(): Jaula[] {
    if (!this.filterTerm) {
      return this.jaulas;
    }
    return this.jaulas.filter(jaula =>
      jaula.nombre.toLowerCase().includes(this.filterTerm.toLowerCase())
    );
  }

  clearFilter(): void {
    this.filterTerm = '';
  }

}
