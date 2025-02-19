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
  locationName: string = ''; // Нова змінна для збереження назви місця
  loading: boolean = false;

  constructor(private weatherService: WeatherService) {}

  getWeatherByPostalCode() {
    this.loading = true;
    this.locationName = `Postal Code: ${this.postalCode}`; // Зберігаємо назву місця
    this.weatherService.getWeatherByPostalCode(this.postalCode).subscribe({
      next: (data) => {
        this.weather = data;
        this.errorMessage = '';
      },
      error: (error) => {
        this.weather = null;
        this.errorMessage = 'Failed to fetch weather data.';
      },
      complete: () => (this.loading = false),
    });
  }

  getWeatherByCity() {
    this.loading = true;
    this.locationName = this.city; // Зберігаємо назву місця
    this.weatherService.getWeatherByCity(this.city).subscribe({
      next: (data) => {
        this.weather = data;
        this.errorMessage = '';
      },
      error: (error) => {
        this.weather = null;
        this.errorMessage = 'Failed to fetch weather data.';
      },
      complete: () => (this.loading = false),
    });
  }

  getWeatherByCoordinates() {
    this.loading = true;
    this.locationName = `Coordinates: (${this.lat}, ${this.lon})`; // Зберігаємо назву місця
    this.weatherService.getWeatherByCoordinates(this.lat, this.lon).subscribe({
      next: (data) => {
        this.weather = data;
        this.errorMessage = '';
      },
      error: (error) => {
        this.weather = null;
        this.errorMessage = 'Failed to fetch weather data.';
      },
      complete: () => (this.loading = false),
    });
  }

  getWeatherByCurrentLocation() {
    if (navigator.geolocation) {
      this.loading = true;
      this.locationName = 'Current Location'; // Зберігаємо назву місця
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          this.getWeatherByCoordinates();
        },
        (error) => {
          this.errorMessage = 'Unable to retrieve your location.';
          this.loading = false;
        }
      );
    } else {
      this.errorMessage = 'Geolocation is not supported by this browser.';
      this.loading = false;
    }
  }
}
