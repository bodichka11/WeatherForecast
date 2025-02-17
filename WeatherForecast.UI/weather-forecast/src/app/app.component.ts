import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherComponent } from "./components/weather/weather.component";
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  standalone: true, // Ensure this is set to true if using standalone components
  imports: [RouterOutlet, WeatherComponent, HttpClientModule], // Add HttpClientModule here
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [WeatherService]
})
export class AppComponent {
  title = 'weather-forecast';
}
