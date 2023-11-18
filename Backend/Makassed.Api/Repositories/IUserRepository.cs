using Makassed.Api.Models.Domain;

namespace Makassed.Api.Repositories;

public interface IUserRepository
{
    Task<MakassedUser> SaveUserAvatarAsync(MakassedUser user, string avatarUrl);
}
