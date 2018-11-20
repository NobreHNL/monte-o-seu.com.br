import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ILanche } from '../lanches/ILanche';
import { LanchesService } from '../../services/lanches/lanches.service';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss']
})
export class CardapioComponent implements OnInit {
  lanches: ILanche[];
  @Output() selectedLanche: EventEmitter<any> = new EventEmitter();

  constructor(private _service: LanchesService) { }
  
  ngOnInit() {
    this._service.list().subscribe(result => {
      this.lanches = result;
      
      for(let lanche of this.lanches){
        lanche.valor = this._service.getValorByLanche(lanche);
      }      
    });
  }

  selectLanche(lanche: ILanche){
    let _lanche = Object.assign({}, lanche);
    _lanche.promocoes = [];  
    this.selectedLanche.emit(_lanche);
  };
}
