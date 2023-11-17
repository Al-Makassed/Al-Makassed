namespace Makassed.Api.Services.SharedServices;

public interface ISharedService
{
    Task<string> GetFilePathUrl(IFormFile file);
    
    int GetFilePageCount(IFormFile file);
}