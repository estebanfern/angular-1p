import { Component } from '@angular/core';
import { ProveedoresService } from '../service/proveedores.service';
import { Proveedor } from '../model/proveedor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  providers: [ProveedoresService],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {

  proveedores: Proveedor[] = [];
  selectedProveedor: Proveedor = new Proveedor();
  p: number = 1;
  filterTerm: string = '';

  constructor (private proveedoresService: ProveedoresService) {
  }

  ngOnInit(): void {
    this.proveedores = this.proveedoresService.get();
  }

  load(): void {
    this.proveedores = this.proveedoresService.get();
  }

  onSubmit(): void {
    if (this.selectedProveedor.idProveedor) {
      // Actualizar proveedor existente
      this.proveedoresService.update(this.selectedProveedor);
    } else {
      // Agregar nuevo proveedor
      this.proveedoresService.add(this.selectedProveedor);
    }
    this.resetForm();
    this.load();
  }

  edit(proveedor: Proveedor): void {
    this.selectedProveedor = { ...proveedor }; // Copia los valores del proveedor seleccionado
  }

  resetForm(): void {
    this.selectedProveedor = new Proveedor(); // Restablece el formulario a un nuevo proveedor vacío
  }

  add(proveedor: Proveedor): void {
    this.proveedoresService.add(proveedor);
    this.proveedores = this.proveedoresService.get();
  }

  update(proveedor: Proveedor): void {
    this.proveedoresService.update(proveedor);
    this.proveedores = this.proveedoresService.get();
  }

  delete(id: number): void {
    this.proveedoresService.delete(id);
    this.proveedores = this.proveedoresService.get();
  }

  get filteredProveedores(): Proveedor[] {
    if (!this.filterTerm) {
      return this.proveedores;
    }
    return this.proveedores.filter(proveedor =>
      proveedor.nombre.toLowerCase().includes(this.filterTerm.toLowerCase())
    );
  }

  clearFilter(): void {
    this.filterTerm = '';
  }


}
