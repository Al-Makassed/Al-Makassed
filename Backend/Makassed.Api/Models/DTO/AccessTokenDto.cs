namespace Makassed.Api.Models.DTO;

public class AccessTokenDto
{
    public required string Token { get; set; }
    
    public required DateTime Expiration { get; set; }
}
