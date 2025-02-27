import { Component } from '@angular/core';
import { provideRouter, Router, RouterOutlet } from '@angular/router';
import { WeatherComponent } from "./components/weather/weather.component";
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './services/weather.service';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WeatherComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [WeatherService] 
})
export class AppComponent {
  title = 'weather-forecast';

  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
