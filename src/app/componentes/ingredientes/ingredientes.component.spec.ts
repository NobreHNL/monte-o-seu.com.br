import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientesComponent } from './ingredientes.component';
import { HttpClientModule } from '@angular/common/http';
import { IngredientesService } from '../../services/ingredientes/ingredientes.service';

describe('Componente Ingredientes', () => {
  let component: IngredientesComponent;
  let fixture: ComponentFixture<IngredientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientesComponent ],
      providers: [
        IngredientesService,
        { provide: 'BASE_URL', useValue: 'http://localhost:3000/' }
      ],
      imports: [
        HttpClientModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   it('criação do componente', () => {
     expect(component).toBeTruthy();
   });
});
