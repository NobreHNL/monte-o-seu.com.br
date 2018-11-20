import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ILanche, Lanche } from './ILanche';
import { LanchesService } from '../../services/lanches/lanches.service';
import { IIngrediente } from '../ingredientes/IIngrediente';

@Component({
  selector: 'app-lanches',
  templateUrl: './lanches.component.html',
  styleUrls: ['./lanches.component.scss']
})
export class LanchesComponent implements OnInit, OnChanges {
  @Input() lanche: ILanche;
  @Output() selectedCustomLanche: EventEmitter<any> = new EventEmitter();

  constructor(private _service: LanchesService) { }

  ngOnInit(): void {
    this.lanche = new Lanche();
  }

  ngOnChanges(): void {
    if (this.lanche != undefined)
      this._service.getValorByIngrediente(this.lanche, 0.1, 3);
  }

  removeIngrediente(index, item){
    if(item.block == true) return;
    this.lanche.ingredientes.splice(index, 1);
    this._service.getValorByIngrediente(this.lanche, 0.1, 3);
  }

  selectCustomLanche(){
    this.lanche = new Lanche();
    this.selectedCustomLanche.emit(this.lanche);
  }
}