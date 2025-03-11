namespace varuosad.Services
{
    public class IlmaennustusService : IIlmaennstusService
    {
        public IlmaennustusService() { }
        public async Task<StreamReader> ReadData(string filePath)
        {
            System.IO.StreamReader data = File.OpenText(filePath);
            return data;
        }

       


        
        
    }
}
