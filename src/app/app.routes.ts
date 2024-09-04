import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';

export const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'proveedores', component: ProveedoresComponent },
];
