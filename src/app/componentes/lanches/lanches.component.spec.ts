import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanchesComponent } from './lanches.component';
import { HttpClientModule } from '@angular/common/http';
import { LanchesService } from '../../services/lanches/lanches.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('Componente Lanches', () => {
  let component: LanchesComponent;
  let fixture: ComponentFixture<LanchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanchesComponent ],
      providers: [
        LanchesService,
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
    fixture = TestBed.createComponent(LanchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   it('criação do componente', () => {
    expect(component).toBeTruthy();
  });
});
