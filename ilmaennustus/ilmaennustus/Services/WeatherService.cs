using ilmaennustus.Models;
using System.Net;
using System.Net.Http;
using System.Text.Json;

namespace ilmaennustus.Services
{
    public class WeatherService : IWeatherService
    {
        private readonly HttpClient _httpClient;
        private readonly string url = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=59.37&lon=24.59&altitude=90";
        public WeatherService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<WeatherResult.Root> Get()
        {
            _httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0 (compatible; AcmeInc/1.0)");
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            Console.Write(response.Content);

            var json = await response.Content.ReadAsStringAsync();
            var weather = JsonSerializer.Deserialize<WeatherResult.Root>(json);
            return weather;
        }
    }
}
