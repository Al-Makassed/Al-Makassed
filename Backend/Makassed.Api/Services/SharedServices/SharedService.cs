using iText.Kernel.Pdf;

namespace Makassed.Api.Services.SharedServices;

public class SharedService : ISharedService
{
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly IHttpContextAccessor _accessor;
    
    public SharedService(IWebHostEnvironment webHostEnvironment, IHttpContextAccessor accessor)
    {
        _webHostEnvironment = webHostEnvironment;
        _accessor = accessor;
    }
    public async Task<string> GetFilePathUrl(IFormFile file)
    {
        var localFilePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Files", $"{file.FileName}");

        await using var stream = new FileStream(localFilePath, FileMode.Create);
        await file.CopyToAsync(stream);
        
        var urlFilePath = $"{_accessor.HttpContext?.Request.Scheme}://{_accessor.HttpContext?.Request.Host}{_accessor.HttpContext?.Request.PathBase}/Images/{file.FileName}";

         

        return urlFilePath;
    }
    
    public int GetFilePageCount(IFormFile file)
    {
        using PdfDocument pdfDoc = new PdfDocument(new PdfReader(file.OpenReadStream()));
        return pdfDoc.GetNumberOfPages();
    }
}