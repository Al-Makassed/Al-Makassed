namespace Makassed.Api.Services.SharedServices;

public interface ISharedService
{
    string GetCode(string parentName, string name, int siblingsCount);

    string UpdateCode(string oldCode, string newName, int index);
}