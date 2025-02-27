import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { WeatherForecastModel } from '../models/weather-forecast-model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = 'http://localhost:5035/api/weather';

  constructor(private http: HttpClient) { }

  getWeatherByPostalCode(postalCode: string): Observable<WeatherForecastModel> {
    return this.http.get<WeatherForecastModel>(`${this.apiUrl}/postal/${postalCode}`).pipe(catchError(this.handleError));;
  }

  getWeatherByCity(city: string): Observable<WeatherForecastModel> {
    return this.http.get<WeatherForecastModel>(`${this.apiUrl}/city/${city}`).pipe(catchError(this.handleError));;
  }

  getWeatherByCoordinates(lat: number, lon: number): Observable<WeatherForecastModel> {
    return this.http.get<WeatherForecastModel>(`${this.apiUrl}/coordinates?lat=${lat}&lon=${lon}`).pipe(catchError(this.handleError));;
  }

  getSearchHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/history`).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}