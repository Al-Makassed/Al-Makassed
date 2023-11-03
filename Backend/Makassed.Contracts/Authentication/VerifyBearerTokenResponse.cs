namespace Makassed.Contracts.Authentication;

public record VerifyBearerTokenResponse(
    string Jti,
    string Id,
    string FullName,
    string UserName,
    string Email,
    string PhoneNumber,
    string ProfileUrl,
    List<string> Roles,
    long Exp,
    string Iss,
    string Aud);
