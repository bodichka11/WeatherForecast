namespace WeatherForecast.Services.Interfaces
{
    public interface IHistoryService
    {
        Task SaveSearchHistory(string searchTerm, string searchType);
    }
}
