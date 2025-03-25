using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using varuosad.Models;
using varuosad.Services;

namespace varuosad.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IVaruosadService _varuosadService;

        public HomeController(IVaruosadService varuosadService, ILogger<HomeController> logger)
        {
            _logger = logger;
            _varuosadService = varuosadService;
        }

        public IActionResult Index()
        {
            var data = _varuosadService.ReadData("Data/LE.txt");
            string text = data.ToString();
            
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
