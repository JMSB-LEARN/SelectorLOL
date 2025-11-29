import { Routes } from '@angular/router';
import { ChampionDetailComponent } from './champion-detail-component/champion-detail-component';
import { ChampionListComponent } from './champion-list-component/champion-list-component';

export const routes: Routes = [
    { path: '', component: ChampionListComponent },
    { path: 'details/:id', component: ChampionDetailComponent }
];
