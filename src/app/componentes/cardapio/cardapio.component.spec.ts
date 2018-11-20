import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardapioComponent } from './cardapio.component';
import { HttpClientModule } from '@angular/common/http';
import { LanchesService } from '../../services/lanches/lanches.service';

describe('Componente Cardápio', () => {
  let component: CardapioComponent;
  let fixture: ComponentFixture<CardapioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardapioComponent ],
      providers: [
        LanchesService,
        { provide: 'BASE_URL', useValue: 'http://localhost:3000/' }
      ],
      imports: [
        HttpClientModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardapioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('criação do componente', () => {
    expect(component).toBeTruthy();
  });
});
