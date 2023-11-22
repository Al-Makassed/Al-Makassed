using iText.Kernel.Pdf;

namespace Makassed.Api.Services.Storage;

public class LocalFileStorageService : ILocalFileStorageService
{
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public LocalFileStorageService(
        IWebHostEnvironment webHostEnvironment, 
        IHttpContextAccessor httpContextAccessor)
    {
        _webHostEnvironment = webHostEnvironment;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<string> UploadFileAndGetUrlAsync(IFormFile file, string destinationFolderName = "Files")
    {
        // --- 1. Generate a unique file name to avoid conflicts. ---
         var uniqueFileName = DateTime.Now.Ticks + "_" + file.FileName;

        // --- 2. Create a Local File Path ---
        var localFilePath = Path.Combine(
            _webHostEnvironment.ContentRootPath,
            destinationFolderName,
            $"{uniqueFileName}");

        // Path.Combine() combines an array of strings into a path.
        // ex: C:\code\csharp\NZWalks\NZWalks.API\Files\{uniqueFileName}.png

        // Create a stream to copy the file to.
        await using var stream = new FileStream(localFilePath, FileMode.Create);

        // Copy the file to the stream.
        await file.CopyToAsync(stream); // Asynchronously copies the contents of the uploaded file to the target stream

        /**
          * The local path is needed to open a stream and then copy the file's content into it,
          * but in order to provide a path that can be stored in database to serve 
          * the image later, we need an accessible URL such as: https://localhost:1234/Images/image.jpg
        */

        // --- 3. Create a URL File Path ---
        // {scheme}://{host}{pathBase}/Files/{uniqueFileName}
        // ex: https://localhost:1234/Files/fileName.jpg
        var scheme = _httpContextAccessor.HttpContext?.Request.Scheme ?? string.Empty; // http or https
        var host = _httpContextAccessor.HttpContext?.Request.Host; // e.g. localhost:8888
        var pathBase = _httpContextAccessor.HttpContext?.Request.PathBase ?? string.Empty;

        // - pathBase shouldn't end with a trailing slash.
        // - In our case the pathBase is empty string.
        var avatarUrl = $"{scheme}://{host}{pathBase}/{destinationFolderName}/{uniqueFileName}";

        return avatarUrl;
    }

    public void DeleteAvatar(string avatarUrl)
    {
        // Get last part of the URL (the file name e.g. image.jpg)
        var fileName = avatarUrl.Split("/").Last();

        // Get the local path of the file
        var localFilePath = Path.Combine(
                       _webHostEnvironment.ContentRootPath,
                        "Avatars",
                        fileName);

        // Delete the file
        File.Delete(localFilePath);
    }
    public int GetPdfFilePageCount(IFormFile file)
    {
        using PdfDocument pdfDoc = new(new PdfReader(file.OpenReadStream()));
        return pdfDoc.GetNumberOfPages();
    }
}
