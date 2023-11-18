namespace Makassed.Api.Constants;

public static class AvatarUploadConfigs
{
    public const long MaxImageUploadSize = 10_485_760; // 10 * 1024 * 1024;
    
    public static readonly List<string> AllowedExtensions = new() { ".jpg", ".jpeg", ".png" };
    
    public const int MaxAvatarWidth = 500;
    
    public const int MaxAvatarHeight = 500;
    
    public static string MaxImageUploadSizeInMegabytes => FormatSizeInMegabytes(MaxImageUploadSize);

    private static string FormatSizeInMegabytes(long bytes)
    {
        const int bytesInMegabyte = 1024 * 1024;
        double sizeInMegabytes = (double)bytes / bytesInMegabyte;

        return $"{sizeInMegabytes:N2} MB";
    }
}
