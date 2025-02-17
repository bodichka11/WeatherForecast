import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  standalone: true, // Ensure this is set to true if using standalone components
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule // Add HttpClientModule here
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  postalCode: string = '';
  city: string = '';
  lat: number = 0;
  lon: number = 0;
  weather: any;
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) {}

  getWeatherByPostalCode() {
    this.weatherService.getWeatherByPostalCode(this.postalCode)
      .subscribe({
        next: (data) => {
          this.weather = data;
          this.errorMessage = '';
        },
        error: (error) => {
          this.weather = null;
          this.errorMessage = 'Failed to fetch weather data.';
        }
      });
  }

  getWeatherByCity() {
    this.weatherService.getWeatherByCity(this.city)
      .subscribe({
        next: (data) => {
          this.weather = data;
          this.errorMessage = '';
        },
        error: (error) => {
          this.weather = null;
          this.errorMessage = 'Failed to fetch weather data.';
        }
      });
  }

  getWeatherByCoordinates() {
    this.weatherService.getWeatherByCoordinates(this.lat, this.lon)
      .subscribe({
        next: (data) => {
          this.weather = data;
          this.errorMessage = '';
        },
        error: (error) => {
          this.weather = null;
          this.errorMessage = 'Failed to fetch weather data.';
        }
      });
  }
}
