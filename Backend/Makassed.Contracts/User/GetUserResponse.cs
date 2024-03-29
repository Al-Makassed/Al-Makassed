﻿using Makassed.Contracts.User.Department;

namespace Makassed.Contracts.User;

public record GetUserResponse
{
    public required string Id { get; set; }

    public string? FullName { get; set; }

    public required string UserName { get; set; }

    public required string Email { get; set; }

    public required Guid DepartmentId { get; set; }

    public required GetDepartmentResponse Department { get; set; }

    public string? PhoneNumber { get; set; }

    public string? AvatarUrl { get; set; }

    public List<string> Roles { get; set; } = new();

    public DateTime CreatedOn { get; set; }

}
