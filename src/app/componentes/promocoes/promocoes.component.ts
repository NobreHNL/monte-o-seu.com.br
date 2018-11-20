import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-promocoes',
  templateUrl: './promocoes.component.html',
  styleUrls: ['./promocoes.component.scss']
})
export class PromocoesComponent implements OnInit {
  @Input() promocoes: string[];
  constructor() { }
  
  ngOnInit(): void {
    this.promocoes = [];
  }
}
