using Microsoft.EntityFrameworkCore;
using System;
using WeatherForecast.Data;
using WeatherForecast.Models;
using WeatherForecast.Services.Interfaces;

namespace WeatherForecast.Services
{
    public class HistoryService : IHistoryService
    {
        private readonly WeatherForecastDbContext _context;

        public HistoryService(WeatherForecastDbContext context)
        {
            _context = context;
        }

        public async Task SaveSearchHistory(string searchTerm, string searchType)
        {
            var history = new SearchHistory
            {
                SearchTerm = searchTerm,
                SearchType = searchType
            };

            _context.SearchHistory.Add(history);
            await _context.SaveChangesAsync();
        }

        public async Task<List<SearchHistory>> GetSearchHistory()
        {
            return await _context.SearchHistory.ToListAsync();
        }
    }
}
