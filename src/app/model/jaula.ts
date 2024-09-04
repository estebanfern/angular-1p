export class Jaula {
  idJaula!: number;
  nombre!: string;
  enUso!: Uso;
}

export enum Uso {
  S = 'S',
  N = 'N'
}
