//Importa Modulos FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { Routing } from './routers';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { LanchesComponent } from './componentes/lanches/lanches.component';
import { LanchesService } from './services/lanches/lanches.service';
import { IngredientesComponent } from './componentes/ingredientes/ingredientes.component';
import { IngredientesService } from './services/ingredientes/ingredientes.service';
import { CardapioComponent } from './componentes/cardapio/cardapio.component';
import { PromocoesComponent } from './componentes/promocoes/promocoes.component';

library.add(fas, far, fab);

@NgModule({
  declarations: [
    AppComponent,
    IngredientesComponent,
    LanchesComponent,
    HomeComponent,
    CardapioComponent,
    PromocoesComponent
  ],
  imports: [
    Routing,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    IngredientesService,
    LanchesService    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
