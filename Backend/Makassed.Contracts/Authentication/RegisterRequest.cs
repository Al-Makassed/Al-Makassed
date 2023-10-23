﻿namespace Makassed.Contracts.Authentication;
public record RegisterRequest
{
    public required string UserId { get; set; }

    public required string UserName { get; set; }

    public required string Email { get; set; }

    public required string Password { get; set; }

    public required string Role { get; set; }
}