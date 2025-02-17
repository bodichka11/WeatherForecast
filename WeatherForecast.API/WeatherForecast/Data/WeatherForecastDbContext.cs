using Microsoft.EntityFrameworkCore;
using WeatherForecast.Models;

namespace WeatherForecast.Data
{
    public class WeatherForecastDbContext: DbContext
    {
        public WeatherForecastDbContext(DbContextOptions<WeatherForecastDbContext> options)
            : base(options)
        {
        }

        public DbSet<SearchHistory> SearchHistory { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
