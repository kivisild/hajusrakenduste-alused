using ilmaennustus.Services;
using Microsoft.AspNetCore.Mvc;

namespace ilmaennustus.Controllers
{
    public class WeatherController : Controller
    {
        // If it's private and readonly, the benefit is that you
        // can't inadvertently change it from another part of
        // that class after it is initialized. The readonly modifier ensures the
        // field can only be given a value during its initialization or in its class constructor.
        private readonly IWeatherService _weatherService;
        public WeatherController(IWeatherService weatherService) 
        { 
            _weatherService = weatherService;
        }

        public async Task<IActionResult> Index()
        {
            var data = _weatherService.Get();
            return View(data);

        }
    }
}
