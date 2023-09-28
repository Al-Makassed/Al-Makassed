namespace Makassed.Api.Services.Policy
{
    public interface IPolicyService
    {
        Task<bool> IsUniqueName(string name);
    }
}
