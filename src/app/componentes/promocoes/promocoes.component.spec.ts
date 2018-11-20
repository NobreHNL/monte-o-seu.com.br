import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocoesComponent } from './promocoes.component';
import { HttpClientModule } from '@angular/common/http';

describe('Componente Promoções', () => {
  let component: PromocoesComponent;
  let fixture: ComponentFixture<PromocoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromocoesComponent ],
      providers: [
        { provide: 'BASE_URL', useValue: 'http://localhost:3000/' }
      ],
      imports: [
        HttpClientModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromocoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   it('criação do componente', () => {
    expect(component).toBeTruthy();
  });
});
