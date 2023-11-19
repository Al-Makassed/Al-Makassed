
using Microsoft.AspNetCore.Http;

namespace Makassed.Contracts.User;
public record UploadUserAvatarRequest(
    IFormFile Image);
