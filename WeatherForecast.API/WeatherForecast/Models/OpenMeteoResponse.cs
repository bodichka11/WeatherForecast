using System.Text.Json.Serialization;

namespace WeatherForecast.Models
{
    public class OpenMeteoResponse
    {
        [JsonPropertyName("current_weather")]
        public CurrentWeather CurrentWeathers { get; set; } = new();

        public class CurrentWeather
        {
            [JsonPropertyName("temperature")]
            public double Temperature { get; set; }

            [JsonPropertyName("windspeed")]
            public double Windspeed { get; set; }

            [JsonPropertyName("weathercode")]
            public int WeatherCode { get; set; }

            [JsonPropertyName("time")]
            public DateTime Time { get; set; }
        }
    }
}
