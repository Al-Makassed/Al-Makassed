namespace Makassed.Api.Services.Chapter
{
    public interface IChapterService
    {
        Task<bool> IsUniqueName(string name); 
    }
}
