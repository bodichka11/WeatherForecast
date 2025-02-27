import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule
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
  locationName: string = '';
  loading: boolean = false;

  constructor(private weatherService: WeatherService) {}

  getWeatherByPostalCode() {
    this.loading = true;
    this.locationName = `Postal Code: ${this.postalCode}`;
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
    this.locationName = this.city;
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
    this.locationName = `Coordinates: (${this.lat}, ${this.lon})`;
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
      this.locationName = 'Current Location';
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
