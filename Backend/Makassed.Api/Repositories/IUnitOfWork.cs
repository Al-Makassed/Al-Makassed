namespace Makassed.Api.Repositories;

public interface IUnitOfWork
{
    Task SaveChangesAsync();
}
