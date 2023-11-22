namespace Makassed.Api.Repositories.Interfaces;

public interface IUnitOfWork
{
    Task SaveChangesAsync();
}
