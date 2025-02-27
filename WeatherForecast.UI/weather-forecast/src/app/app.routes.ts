import { Routes } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';
import { HistoryComponent } from './components/history/history.component';

export const routes: Routes = [
    { path: '', redirectTo: '/weather', pathMatch: 'full' },
    { path: 'weather', component: WeatherComponent },
    { path: 'history', component: HistoryComponent },
  ];