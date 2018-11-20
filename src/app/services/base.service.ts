import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BaseServices {

  constructor() { }
  //Retorna mensagem de erro
  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Ocorreu um erro:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Código retornado ${error.status}, ` +
        `Conteúdo: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Aconteceu algo erroaod; Por favor tente novamente mais tarde.');
  };
}
