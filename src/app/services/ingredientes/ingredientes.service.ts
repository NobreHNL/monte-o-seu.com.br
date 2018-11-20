import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IIngrediente } from '../../componentes/ingredientes/IIngrediente';
import { BaseServices } from '../base.service';

@Injectable()
export class IngredientesService extends BaseServices {
  constructor(private _http: HttpClient, @Inject('BASE_URL') private BASE_URL: string){super();}

  //Retorna Todos os ingredientes
  list(): Observable<IIngrediente[]> {
    return this._http.get<IIngrediente[]>(this.BASE_URL + 'ingredientes')
    .pipe(catchError(this.handleError));
  }  

  getIngredienteByNome(nome: string): Observable<IIngrediente> {
    return this._http.get<IIngrediente>(this.BASE_URL + 'ingredientes?nome=' + nome)
    .pipe(catchError(this.handleError));
  }
  
  getIngredienteById(id: number): Observable<IIngrediente> {
    return this._http.get<IIngrediente>(this.BASE_URL + 'ingredientes?id=' + id)
    .pipe(catchError(this.handleError));
  }
}