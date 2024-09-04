import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ProductosComponent } from './productos/productos.component';

export const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'productos', component: ProductosComponent },

];
