import { TestBed, inject, async, getTestBed } from '@angular/core/testing';
import { IngredientesService } from './ingredientes.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('Service Ingredientes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IngredientesService,
        { provide: 'BASE_URL', useValue: 'http://localhost:3000/' }
      ],
      imports: [
        HttpClientModule,
      ],
    });
  });

  //listar todos os ingredientes
  it('Listar todos os Ingredientes', async(inject([IngredientesService], (service: IngredientesService) => {
    const ingredientesResponse = [
      {"id": 1,"nome": "Alface","valor": 0.40, "block": false},
      {"id": 2,"nome": "Bacon","valor": 2.00, "block": false},
      {"id": 3,"nome": "Hambúrguer de carne","valor": 3.00, "block": false},
      {"id": 4,"nome": "Ovo","valor": 0.80, "block": false},
      {"id": 5,"nome": "Queijo","valor": 1.50, "block": false}
    ];

    spyOn(service, 'list').and.returnValue(of(ingredientesResponse));
    
    let ingredientes;
    service.list().subscribe(result => { 
      ingredientes = result;
      
      expect(ingredientes).toBeTruthy();
      expect(ingredientes).toBeDefined();
      expect(ingredientes.length).toEqual(ingredientesResponse.length);
      expect(ingredientes).toEqual(ingredientesResponse);
    });   
  })));
});
