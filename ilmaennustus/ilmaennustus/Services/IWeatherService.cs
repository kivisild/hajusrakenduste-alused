using ilmaennustus.Models;

namespace ilmaennustus.Services
{
    public interface IWeatherService
    {
       Task<WeatherResult> Get();
    }
}
