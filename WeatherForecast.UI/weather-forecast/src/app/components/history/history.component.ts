import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  history: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getSearchHistory();
  }

  getSearchHistory() {
    this.weatherService.getSearchHistory().subscribe({
      next: (data) => {
        this.history = data.map(item => ({
          ...item,
          searchDate: new Date(item.searchDate)
        }));
        this.errorMessage = '';
      },
      error: (error) => {
        this.history = [];
        this.errorMessage = 'Failed to fetch search history.';
      },
      complete: () => (this.loading = false),
    });
  }
}
