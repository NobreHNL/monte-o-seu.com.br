import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { IngredientesComponent } from '../../componentes/ingredientes/ingredientes.component';
import { LanchesComponent } from '../../componentes/lanches/lanches.component';
import { CardapioComponent } from '../../componentes/cardapio/cardapio.component';
import { PromocoesComponent } from '../../componentes/promocoes/promocoes.component';
import { LanchesService } from '../../services/lanches/lanches.service';
import { IngredientesService } from '../../services/ingredientes/ingredientes.service';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('Componente Home', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        IngredientesComponent,
        LanchesComponent,
        CardapioComponent,
        PromocoesComponent],
      providers: [
        LanchesService,
        IngredientesService,
        { provide: 'BASE_URL', useValue: 'http://localhost:3000/' }
      ],
      imports: [
        HttpClientModule,
        FontAwesomeModule
      ],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('criação do componente', () => {
    expect(component).toBeTruthy();
  });
});
