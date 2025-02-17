import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherForecastModel } from '../models/weather-forecast-model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = 'http://localhost:5035/api/weather';

  constructor(private http: HttpClient) { }

  getWeatherByPostalCode(postalCode: string): Observable<WeatherForecastModel> {
    return this.http.get<WeatherForecastModel>(`${this.apiUrl}/postal/${postalCode}`);
  }

  getWeatherByCity(city: string): Observable<WeatherForecastModel> {
    return this.http.get<WeatherForecastModel>(`${this.apiUrl}/city/${city}`);
  }

  getWeatherByCoordinates(lat: number, lon: number): Observable<WeatherForecastModel> {
    return this.http.get<WeatherForecastModel>(`${this.apiUrl}/coordinates?lat=${lat}&lon=${lon}`);
  }
}