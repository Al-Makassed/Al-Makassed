using Microsoft.AspNetCore.Mvc;
using UserManagement.Service.Models.DTOs;

namespace Makassed.Api.Controllers;
public class AuthenticationController : ApiController
{
    public AuthenticationController()
    {
        
    }
    
    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model) 
    {
        return Ok();
    }

    //public async Task<IActionResult> Login([FromBody] LoginModel model)
    //{
    //    var user = await _userManager.FindByNameAsync(model.Username);
    //    if (user == null)
    //    {
    //        return Unauthorized();
    //    }

    //    var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
    //    if (!result.Succeeded)
    //    {
    //        return Unauthorized();
    //    }

    //    var claims = new List<Claim>
    //    {
    //        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
    //        new Claim(ClaimTypes.Name, user.UserName),
    //        new Claim(ClaimTypes.Email, user.Email),
    //        new Claim(ClaimTypes.MobilePhone, user.PhoneNumber),
    //        new Claim(ClaimTypes.Role, user.Role.ToString())
    //    };

    //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
    //    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
    //    var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["Jwt:ExpireDays"]));

    //    var token = new JwtSecurityToken(
    //                   _configuration["Jwt:Issuer"],
    //                              _configuration["Jwt:Issuer"],
    //                                         claims,
    //                                                    expires: expires,
    //                                                               signingCredentials: creds
    //                                                                      );

    //    return Ok(new
    //    {
    //        token = new JwtSecurityTokenHandler().WriteToken(token),
    //        expiration = expires
    //    });
    //}
}
