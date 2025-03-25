using System.Web.Extensions;
namespace varuosad.Services
{
    public class VaruosadService : IVaruosadService
    {
        public VaruosadService() { }
        public async Task<string> ReadData(string filePath)
        {
            var csv = new List<string[]>(); // or, List<YourClass>
            var lines = System.IO.File.ReadAllLines(filePath);
            foreach (string line in lines)
                 line.Split(",");

            
            
        
        }

       


        
        
    }
}
