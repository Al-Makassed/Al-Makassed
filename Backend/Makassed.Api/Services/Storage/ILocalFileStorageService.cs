namespace Makassed.Api.Services.Storage;

public interface ILocalFileStorageService
{
    Task<string> UploadFileAndGetUrlAsync(IFormFile file, string destinationFolderName = "Files");
    
    void DeleteAvatar(string avatarUrl);

    int GetPdfFilePageCount(IFormFile file);
}

