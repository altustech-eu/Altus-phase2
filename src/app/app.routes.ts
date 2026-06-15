import { Routes } from '@angular/router';
import { HomePageComponent } from '../components/home-page';
import { MainSearchComponent } from '../components/mainsearch/Mainsearch';
import { PathwayProcessComponent } from '../components/ausstandalone';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'mainsearch',
    component: MainSearchComponent
  },
  {
    path: 'pathway-process',
    component: PathwayProcessComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];