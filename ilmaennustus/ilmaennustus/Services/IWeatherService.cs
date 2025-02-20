using ilmaennustus.Data;

namespace ilmaennustus.Services
{
    public interface IWeatherService
    {
       Task<WeatherResult> Get();
    }
}
