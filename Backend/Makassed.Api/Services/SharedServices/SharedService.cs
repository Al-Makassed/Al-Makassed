namespace Makassed.Api.Services.SharedServices;

public class SharedService : ISharedService
{

    public SharedService() { }

    public string GetCode(string parentName, string name, int siblingsCount)
    {
        var parentAbbreviation = new string(parentName.Split(' ').Select(s => s[0]).ToArray());

        var instanceNameAbbreviation = new string(name.Split(' ').Select(s => s[0]).ToArray());

        return $"{parentAbbreviation.ToUpper()}. {instanceNameAbbreviation.ToUpper()} -{siblingsCount + 1}";
    }

    public string UpdateCode(string oldCode, string newName, int index)
    {
        var abbreviationToChange = new string(newName.Split(' ').Select(s => s[0]).ToArray());

        var codeParts = oldCode.Split(' ');

        return index == 0 ? $"{abbreviationToChange.ToUpper()}. {codeParts[1]} {codeParts[2]}" : $"{codeParts[0]} {abbreviationToChange.ToUpper()} {codeParts[2]}";
    }
}
