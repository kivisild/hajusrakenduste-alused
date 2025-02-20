using ilmaennustus.Data;
using System.Net;
using System.Text.Json;

namespace ilmaennustus.Services
{
    public class WeatherService : IWeatherService
    {
        private readonly HttpClient _httpClient;
        private readonly string url = "https://api.met.no/weatherapi/locationforecast/2.0/classic?lat=59.37&lon=24.59&altitude=90";
        public WeatherService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<WeatherResult> Get()
        {
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            Console.Write(response.Content);

            var json = await response.Content.ReadAsStringAsync();
            var weather = JsonSerializer.Deserialize<WeatherResult>(json);
            return weather;
        }
    }
}
