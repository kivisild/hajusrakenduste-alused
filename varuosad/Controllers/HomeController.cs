using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using varuosad.Models;
using varuosad.Services;

namespace varuosad.Controllers
{
    public class HomeController : Controller
    {
        private readonly IVaruosadService _varuosadService;

        public HomeController(IVaruosadService varuosadService)
        {
            
            _varuosadService = varuosadService;
        }

        public IActionResult Index()
        {
            string data = _varuosadService.ReadData("Data/LE.txt");
            
            return View("Index", model: data);
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
