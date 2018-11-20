import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ILanche, Lanche } from '../../componentes/lanches/ILanche';
import { IIngrediente } from '../../componentes/ingredientes/IIngrediente';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lanche: ILanche;
  promocoes: string[];
  lanche_customizavel: ILanche;

  constructor() { }

  ngOnInit() {
  }

  reciverLanches(response){
    this.lanche = response;
    this.promocoes = response.promocoes;    
    this.createLancheCustomizavel(response);
  }

  reciverIngredientes(_ingrediente){
    if(!this.lanche){
      let ingredientes: IIngrediente[] = [];
      ingredientes.push(_ingrediente);

      this.lanche = new Lanche();
      this.lanche.ingredientes = ingredientes;

      this.createLancheCustomizavel(this.lanche);
    }else{
      let ingredientes = this.lanche.ingredientes.slice();
      ingredientes.push(_ingrediente);

      this.lanche.ingredientes = ingredientes;
      this.promocoes = this.lanche.promocoes;    
  
      this.createLancheCustomizavel(this.lanche);
    }
  }

  createLancheCustomizavel(lanche){
    this.lanche_customizavel = Object.assign({}, lanche);
  }

  setCustomLanche(){
    this.lanche = new Lanche();
  }
}
