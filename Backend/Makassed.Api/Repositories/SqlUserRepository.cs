using Makassed.Api.Data;
using Makassed.Api.Models.Domain;

namespace Makassed.Api.Repositories;

public class SqlUserRepository : IUserRepository
{
    private readonly MakassedDbContext _dbContext;

    public SqlUserRepository(MakassedDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<MakassedUser> SaveUserAvatarAsync(MakassedUser user, string avatarUrl)
    {
        user.AvatarUrl = avatarUrl;
        await _dbContext.SaveChangesAsync();
        return user;
    }
}
