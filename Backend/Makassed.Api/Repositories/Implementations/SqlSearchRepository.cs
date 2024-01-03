using Makassed.Api.Data;
using Makassed.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Makassed.Api.Repositories.Implementations;

public class SqlSearchRepository : ISearchRepository
{
    private readonly MakassedDbContext _dbContext;

    public SqlSearchRepository(MakassedDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    /// <summary>
    /// Searches for entities of type T in the database based on the provided query.
    /// </summary>
    /// <typeparam name="T">The type of entities to search for.</typeparam>
    /// <param name="query">The search query.</param>
    /// <returns>An IQueryable of objects representing the search results.</returns>
    /// <remarks>
    /// This method dynamically checks for the presence of "Code" property in the entity type.
    /// The search is performed based on the "Name" property and, if applicable, the "Code" property.
    /// </remarks>
    public async Task<List<T>> SearchEntityAsync<T>(string query) where T : class
    {
        IQueryable<T> entities = _dbContext.Set<T>();

        bool hasCodeProperty = typeof(T).GetProperty("Code") != null;

        entities = entities.Where(entity =>
        EF.Property<string>(entity, "Name").Contains(query) ||
        hasCodeProperty && EF.Property<string>(entity, "Code").Contains(query));

        return await entities.ToListAsync();
    }
}