import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ProductosComponent } from './productos/productos.component';
import { JaulasComponent } from './jaulas/jaulas.component';
import { RecepcionComponent } from './recepcion/recepcion.component';

export const routes: Routes = [
  { path: '', component: PrincipalComponent, title: 'Inicio' },
  { path: 'proveedores', component: ProveedoresComponent, title: 'Proveedores' },
  { path: 'productos', component: ProductosComponent, title: 'Productos' },
  { path: 'jaulas', component: JaulasComponent, title: 'Jaulas' },
  { path: 'recepcion', component: RecepcionComponent, title: 'Recepción' },
];
