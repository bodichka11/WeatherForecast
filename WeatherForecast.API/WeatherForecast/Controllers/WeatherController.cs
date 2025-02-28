using Microsoft.AspNetCore.Mvc;
using WeatherForecast.Services.Interfaces;

namespace WeatherForecast.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherController: ControllerBase
    {
        private readonly IWeatherService _weatherService;
        private readonly IHistoryService _historyService;

        public WeatherController(IWeatherService weatherService, IHistoryService historyService)
        {
            _weatherService = weatherService;
            _historyService = historyService;
        }

        [HttpGet("postal/{postalCode}")]
        public async Task<IActionResult> GetByPostalCode(string postalCode)
        {
            var result = await _weatherService.GetWeatherByPostalCode(postalCode);
            await _historyService.SaveSearchHistory(postalCode, "postal");
            return Ok(result);
        }

        [HttpGet("city/{city}")]
        public async Task<IActionResult> GetByCity(string city)
        {
            var result = await _weatherService.GetWeatherByCity(city);
            await _historyService.SaveSearchHistory(city, "city");
            return Ok(result);
        }

        [HttpGet("coordinates")]
        public async Task<IActionResult> GetByCoordinates(double lat, double lon)
        {
            var result = await _weatherService.GetWeatherByCoordinates(lat, lon);
            await _historyService.SaveSearchHistory($"{lat},{lon}", "coordinates");
            return Ok(result);
        }

        [HttpGet("history")]
        public async Task<IActionResult> GetSearchHistory()
        {
            var searchHistories = await _historyService.GetSearchHistory();
            return Ok(searchHistories);
        }
    }
}
