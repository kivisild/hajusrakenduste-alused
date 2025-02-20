using ilmaennustus.Models;
using ilmaennustus.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace ilmaennustus.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IWeatherService _weatherService;


        public HomeController(ILogger<HomeController> logger,
            IWeatherService weatherService)
        {
            _logger = logger;
            _weatherService = weatherService;
        }

        public async Task<IActionResult> Index()
        {
            var weather = await _weatherService.Get();

            return View(weather);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
