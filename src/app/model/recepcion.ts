import { Jaula } from "./jaula";
import { Producto } from "./producto";
import { Proveedor } from "./proveedor";
import { Time } from "./time";

export class Recepcion {

  idTurno!: number;
  fecha!: Date;
  horaInicioAgendamiento!: string;
  horaFinAgendamiento!: string;
  idProveedor!: number;
  idJaula!: number;
  horaInicioRecepcion!: string;
  horaFinRecepcion!: string;
  detalles!: Detalle[];
  estado!: Estado;

  recepcionar(): void {
    this.estado = Estado.EN_RECEPCION;
  }

  completar(): void {
    this.estado = Estado.COMPLETADO;
  }

}

export class Detalle {
  idDetalle!: number;
  cantidad!: number;
  idProducto!: number;
}

export enum Estado {
  PENDIENTE = 'PENDIENTE',
  EN_RECEPCION = 'EN_RECEPCION',
  COMPLETADO = 'COMPLETADO'
}
