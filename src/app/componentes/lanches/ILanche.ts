import { IIngrediente } from "../ingredientes/IIngrediente";

export interface ILanche {
  id: number;
  nome: string;
  valor: number;
  promocoes: string[],
  ingredientes: IIngrediente[]
}

export class Lanche implements ILanche {
  id = 0;
  nome = "Custom Lanche";
  valor = 0;
  ingredientes = [];
  promocoes = [];
}