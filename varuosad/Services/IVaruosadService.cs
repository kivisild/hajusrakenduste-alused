namespace varuosad.Services
{
    public interface IIlmaennstusService
    {
        Task<StreamReader> ReadData(string filepath);
    }
}