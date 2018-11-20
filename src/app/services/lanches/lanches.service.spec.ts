import { TestBed, inject, async } from '@angular/core/testing';

import { LanchesService } from './lanches.service';
import { HttpClientModule } from '@angular/common/http';
import { IngredientesService } from '../ingredientes/ingredientes.service';
import { of } from 'rxjs';

describe('Service Lanches', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LanchesService,
        IngredientesService,
        { provide: 'BASE_URL', useValue: 'http://localhost:3000/' }
      ],
      imports: [
        HttpClientModule,
      ],
    });
  });

  //listar todos os lanches
  it('Listar todos os lanches', async(inject([LanchesService], (service: LanchesService) => {
    const lanchesResponse = [
      {"id": 1,"nome": "X-Bacon","ingredientes": [{"id": 2,"idLanche": 1,"nome": "Bacon","valor": 2.00, "block": true},{"id": 3,"idLanche": 1,"nome": "Hambúrguer de carne","valor": 3.00, "block": true},{"id": 5,"idLanche": 1,"nome": "Queijo","valor": 1.50, "block": true}]} ,
      {"id": 2,"nome": "X-Burger","ingredientes": [{"id": 3,"idLanche": 2,"nome": "Hambúrguer de carne","valor": 3.00, "block": true},{"id": 5,"idLanche": 2,"nome": "Queijo","valor": 1.50, "block": true}]} ,
      {"id": 3,"nome": "X-Egg","ingredientes": [{"id": 3,"idLanche": 3,"nome": "Hambúrguer de carne","valor": 3.00, "block": true},{"id": 4,"idLanche": 3,"nome": "Ovo","valor": 0.80, "block": true},{"id": 5,"idLanche": 3,"nome": "Queijo","valor": 1.50, "block": true}]},
      {"id": 4,"nome": "X-Egg Bacon","ingredientes": [{"id": 2,"idLanche": 4,"nome": "Bacon","valor": 2.00, "block": true},{"id": 3,"idLanche": 4,"nome": "Hambúrguer de carne","valor": 3.00, "block": true},{"id": 4,"idLanche": 4,"nome": "Ovo","valor": 0.80, "block": true},{"id": 5,"idLanche": 4,"nome": "Queijo","valor": 1.50, "block": true}]}
    ];
    
    spyOn(service, 'list').and.returnValue(of(lanchesResponse));
    
    let lanches;
    service.list().subscribe(result => {
      lanches = result;
      expect(lanches).toBeTruthy();
      expect(lanches).toBeDefined();
      expect(lanches.length).toEqual(lanchesResponse.length);
      expect(lanches).toEqual(lanchesResponse);
    });
  })));

  //validar valor dos lanches de cardápio
  describe("Validar valor dos lanches de cardápio", () => {
    it('O valor do lanche X-Bacon deve ser 6.50', async(inject([LanchesService], (service: LanchesService) => {
      service.getLancheByNome("X-Bacon").subscribe(result => {
        let lanche = result[0];
        expect(service.getValorByLanche(lanche)).toEqual(getAuxValor(lanche.ingredientes));
      });
    })));

    it('O valor do lanche X-Burger deve ser 4.50', async(inject([LanchesService], (service: LanchesService) => {
      service.getLancheByNome("X-Burger").subscribe(result => {
        let lanche = result[0];
        expect(service.getValorByLanche(lanche)).toEqual(getAuxValor(lanche.ingredientes));
      });
    })));

    it('O valor do lanche X-Egg deve ser 5.30', async(inject([LanchesService], (service: LanchesService) => {
      service.getLancheByNome("X-Egg").subscribe(result => {
        let lanche = result[0];
        expect(service.getValorByLanche(lanche)).toEqual(getAuxValor(lanche.ingredientes));
      });
    })));

    it('O valor do lanche X-Egg Bacon deve ser 7.30', async(inject([LanchesService], (service: LanchesService) => {
      service.getLancheByNome("X-Egg Bacon").subscribe(result => {
        let lanche = result[0];
        expect(service.getValorByLanche(lanche)).toEqual(getAuxValor(lanche.ingredientes));
      });
    })));
  });

  //validar regra para cálculo de preço e promoções
  describe("Validar regra para cálculo de preço e promoções", () => {
    it('Lanche Light - 10% de desconto.', async(inject([LanchesService, IngredientesService], (lancheService: LanchesService, ingredienteService: IngredientesService) => {
      lancheService.getLancheByNome("X-Egg").subscribe(result => {
        let lanche = result[0];

        ingredienteService.getIngredienteByNome("Alface").subscribe(result => {
          let ingrediente = result[0];
          ingrediente.idLanche = lanche.id;
          lanche.ingredientes.push(ingrediente);

          let desconto = getAuxValor(lanche.ingredientes) * 0.1;
          expect(lancheService.getValorByIngrediente(lanche, 0.1)).toEqual(getAuxValor(lanche.ingredientes, desconto));
        });
      });
    })));

    it('Lanche Muita carne - A cada 3 porções de carne uma gratis.', async(inject([LanchesService, IngredientesService], (lancheService: LanchesService, ingredienteService: IngredientesService) => {
      lancheService.getLancheByNome("X-Bacon").subscribe(result => {
        let lanche = result[0];
        ingredienteService.getIngredienteByNome("Hambúrguer de carne").subscribe(result => {
          let ingrediente = result[0];
          let qtd_promocao = 3;
          ingrediente.idLanche = lanche.id;

          for (let x = 0; x < 8; x++) {
            lanche.ingredientes.push(ingrediente);
          }

          let desconto = ingrediente.valor * Math.trunc(9/qtd_promocao);  
          expect(lancheService.getValorByIngrediente(lanche, null, qtd_promocao)).toEqual(getAuxValor(lanche.ingredientes, desconto));
        });
      });
    })));

    it('Lanche Muito queijo - A cada 3 porções de queijo uma gratis.', async(inject([LanchesService, IngredientesService], (lancheService: LanchesService, ingredienteService: IngredientesService) => {
      lancheService.getLancheByNome("X-Burger").subscribe(result => {
        let lanche = result[0];
        ingredienteService.getIngredienteByNome("Queijo").subscribe(result => {
          let ingrediente = result[0];
          let qtd_promocao = 3;
          ingrediente.idLanche = lanche.id;

          for (let x = 0; x < 11; x++) {
            lanche.ingredientes.push(ingrediente);
          }

          let desconto = ingrediente.valor * Math.trunc(12/qtd_promocao);  
          expect(lancheService.getValorByIngrediente(lanche, null, qtd_promocao)).toEqual(getAuxValor(lanche.ingredientes, desconto));
        });
      });
    })));
  });
});

function getAuxValor(ingredientes, desconto?) {
  let preco: number = 0;
  for (let item of ingredientes) {
    preco += item.valor;
  }

  if (desconto != undefined)
    preco = preco - desconto;

  return preco;
}
