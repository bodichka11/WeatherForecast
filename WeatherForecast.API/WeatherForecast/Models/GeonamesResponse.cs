using System.Text.Json.Serialization;

namespace WeatherForecast.Models
{
    public class GeonamesResponse
    {
        [JsonPropertyName("postalCodes")]
        public List<PostalCode> PostalCodes { get; set; } = new();

        [JsonPropertyName("geonames")]
        public List<Geoname> Geonames { get; set; } = new();

        public class PostalCode
        {
            [JsonPropertyName("placeName")]
            public string PlaceName { get; set; } = string.Empty;

            [JsonPropertyName("lat")]
            public double Lat { get; set; }

            [JsonPropertyName("lng")]
            public double Lng { get; set; }
        }

        public class Geoname
        {
            [JsonPropertyName("lat")]
            public double Lat { get; set; }

            [JsonPropertyName("lng")]
            public double Lng { get; set; }

            [JsonPropertyName("name")]
            public string Name { get; set; } = string.Empty;
        }
    }
}
