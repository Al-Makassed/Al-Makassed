namespace Makassed.Api.Services.SharedServices;

public interface ISharedService
{
    Task<string> GetFilePathUrl(IFormFile file);
    int GetFilePageCount(IFormFile file);
    string GetCode(string patentName, string name, int siblingsCount);
    string UpdateCodeFirstSection(string policyCode, string newChapterName);
}