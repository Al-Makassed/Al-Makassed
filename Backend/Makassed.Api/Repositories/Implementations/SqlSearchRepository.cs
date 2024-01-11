using Makassed.Api.Data;
using Makassed.Api.Models.Domain;
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
    /// Asynchronously searches for entities of type <typeparamref name="T"/> in the database
    /// based on the provided query, filtering by name and code.
    /// </summary>
    /// <typeparam name="T">The type of entities to search for.</typeparam>
    /// <param name="query">The search query used to filter entities.</param>
    /// <param name="isManager">A boolean indicating whether the user is a manager or not.</param>
    /// <returns>
    /// A list of entities of type <typeparamref name="T"/> matching the search criteria.
    /// </returns>
    /// <remarks>
    /// This method performs a search on the "Name" property and,
    /// if applicable, on the "Code" property of the entities.
    /// For entities of type FocalPointTask, it filters based on the MonitoringTool's name.
    /// </remarks> 
    public async Task<List<T>> SearchEntityAsync<T>(string query, bool isManager) where T : class
    {
        IQueryable<T> entities = _dbContext.Set<T>();

        bool hasCodeProperty = typeof(T).GetProperty("Code") != null;
        bool hasApprovedProperty = typeof(T).GetProperty("IsApproved") != null;


        if (typeof(T) == typeof(FocalPointTask))
            entities = entities
                .Include(f => (f as FocalPointTask)!.MonitoringTool)
                .Include(f => (f as FocalPointTask)!.Department)
                .Where(entity =>
                    EF.Property<MonitoringTool>(entity, "MonitoringTool").Name.Contains(query) &&
                    EF.Property<MonitoringTool>(entity, "MonitoringTool").IsApproved
                );

        else
            entities = entities.Where(entity =>
                EF.Property<string>(entity, "Name").Contains(query) ||
                hasCodeProperty && EF.Property<string>(entity, "Code").Contains(query)                
            );

        return !isManager && hasApprovedProperty ? await NonManagerFilter(entities) : await entities.ToListAsync();
    }

    public async Task<List<T>> NonManagerFilter<T>(IQueryable<T> entities)
    {
        entities = entities.Where(entity =>
            EF.Property<bool>(entity!, "IsApproved")
        );

        return await entities.ToListAsync();
    }
}
