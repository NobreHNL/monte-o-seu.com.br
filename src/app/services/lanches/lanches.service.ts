import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseServices } from "../base.service";
import { catchError } from 'rxjs/operators';
import { ILanche } from '../../componentes/lanches/ILanche';
import { IIngrediente } from '../../componentes/ingredientes/IIngrediente';


@Injectable({ providedIn: 'root' })
export class LanchesService extends BaseServices {
  constructor(private _http: HttpClient, @Inject('BASE_URL') private BASE_URL: string) { super(); }

  list(): Observable<ILanche[]> {
    return this._http.get<ILanche[]>(this.BASE_URL + 'lanches')
      .pipe(catchError(this.handleError));
  }

  getLancheByNome(nome: string): Observable<ILanche> {
    return this._http.get<ILanche>(this.BASE_URL + 'lanches?nome=' + nome)
      .pipe(catchError(this.handleError));
  }

  getLancheById(id: number): Observable<ILanche> {
    return this._http.get<ILanche>(this.BASE_URL + 'lanches?id=' + id)
      .pipe(catchError(this.handleError));
  }

  getValorByIngrediente(lanche: ILanche, porc_desconto?, qtd_promocao?): number {
    let ingredientes: IIngrediente[] = lanche.ingredientes;
    let promocoes: string[] = [];
    let preco = this.getValor(ingredientes);

    if (lanche.promocoes == undefined) lanche.promocoes = promocoes;

    preco = this.getPromocao(lanche, ingredientes, preco, "Hambúrguer", qtd_promocao);
    preco = this.getPromocao(lanche, ingredientes, preco, "Queijo", qtd_promocao);
    preco = this.getDesconto(lanche, ingredientes, preco, "Alface", "Bacon", 0.1);

    lanche.valor = preco;
    return preco;
  }

  getValorByLanche(lanche: ILanche): number {
    let ingredientes: IIngrediente[] = lanche.ingredientes;
    return this.getValor(ingredientes);
  }

  getPromocao(lanche: ILanche, ingredientes: IIngrediente[], preco: number, tipo: string, qtd_promocao: number): number {
    qtd_promocao = !qtd_promocao ? 3 : qtd_promocao;
    let item_promo: number = Math.trunc(ingredientes.filter(ing => ing.nome.includes(tipo)).length / qtd_promocao);
    if (item_promo == 0) {
      if (lanche.promocoes.indexOf(tipo) != -1)
        lanche.promocoes.splice(lanche.promocoes.indexOf(tipo), 1);

      return preco
    };

    if (lanche.promocoes.indexOf(tipo) == -1)
      lanche.promocoes.push(tipo);

    let valor_item: number = ingredientes.find(ing => ing.nome.includes(tipo)).valor;
    return preco - (valor_item * item_promo);
  }

  getDesconto(lanche: ILanche, ingredientes: IIngrediente[], preco: number, itemInc: string, itemDes: string, porc_desconto: number): number {
    porc_desconto = !porc_desconto ? 0.1 : porc_desconto;
    if (ingredientes.filter(ing => ing.nome == itemInc).length > 0
      && ingredientes.filter(ing => ing.nome == itemDes).length == 0) {

      if (lanche.promocoes.indexOf("Light") == -1)
        lanche.promocoes.push("Light");

      preco = preco - (preco * porc_desconto);
    } else {
      if (lanche.promocoes.indexOf("Light") != -1)
        lanche.promocoes.splice(lanche.promocoes.indexOf("Light"), 1);
    }

    return preco;
  }

  getValor(ingredientes: IIngrediente[]): number {
    let preco: number = 0;
    for (let item of ingredientes) {
      preco += item.valor;
    }
    return preco;
  }
}