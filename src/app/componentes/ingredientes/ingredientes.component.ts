import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IngredientesService } from '../../services/ingredientes/ingredientes.service';
import { IIngrediente } from './IIngrediente';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.scss']
})
export class IngredientesComponent implements OnInit {
  ingredientes: IIngrediente[];
  @Output() selectedIngrediente: EventEmitter<any> = new EventEmitter();

  constructor(private _service: IngredientesService) { }

  ngOnInit() {
    this._service.list().subscribe(result => { this.ingredientes = result });
  }

  selectIngrediente(ingrediente) {
    this.selectedIngrediente.emit(ingrediente);
  }
}
