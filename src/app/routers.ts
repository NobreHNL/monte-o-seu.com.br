import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './views/home/home.component';

//Cria Routers das Views
const appRoutes: Routes = [
        {path: '', component: HomeComponent}
    ];

    export const Routing = RouterModule.forRoot(appRoutes);
