namespace varuosad.Services
{
    public interface IVaruosadService
    {
        Task<string> ReadData(string filepath);
    }
}