import { Component } from '@angular/core';
import { ProveedoresService } from '../service/proveedores.service';
import { Proveedor } from '../model/proveedor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [ProveedoresService],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {

  proveedores: Proveedor[] = [];
  selectedProveedor: Proveedor = new Proveedor();

  constructor (private proveedoresService: ProveedoresService) {
  }

  ngOnInit(): void {
    this.proveedores = this.proveedoresService.getProveedores();
  }

  loadProveedores(): void {
    this.proveedores = this.proveedoresService.getProveedores();
  }

  onSubmit(): void {
    if (this.selectedProveedor.idProveedor) {
      // Actualizar proveedor existente
      this.proveedoresService.updateProveedor(this.selectedProveedor);
    } else {
      // Agregar nuevo proveedor
      this.proveedoresService.addProveedor(this.selectedProveedor);
    }
    this.resetForm();
    this.loadProveedores();
  }

  editProveedor(proveedor: Proveedor): void {
    this.selectedProveedor = { ...proveedor }; // Copia los valores del proveedor seleccionado
  }

  resetForm(): void {
    this.selectedProveedor = new Proveedor(); // Restablece el formulario a un nuevo proveedor vacío
  }

  addProveedor(proveedor: Proveedor): void {
    this.proveedoresService.addProveedor(proveedor);
    this.proveedores = this.proveedoresService.getProveedores();
  }

  updateProveedor(proveedor: Proveedor): void {
    this.proveedoresService.updateProveedor(proveedor);
    this.proveedores = this.proveedoresService.getProveedores();
  }

  deleteProveedor(id: number): void {
    this.proveedoresService.deleteProveedor(id);
    this.proveedores = this.proveedoresService.getProveedores();
  }

}
