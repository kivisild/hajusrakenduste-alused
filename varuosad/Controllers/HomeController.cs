using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using varuosad.Models;
using varuosad.Services;

namespace varuosad.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IIlmaennstusService _ilmaennustusService;

        public HomeController(ILogger<HomeController> logger, IIlmaennstusService ilmaennustusService)
        {
            _logger = logger;
            _ilmaennustusService = ilmaennustusService;
        }

        public IActionResult Index()
        {
            var data = _ilmaennustusService.ReadData("Data/LE.txt");
            return View(data);
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
