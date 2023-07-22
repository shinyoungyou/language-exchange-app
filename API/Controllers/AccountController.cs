using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OpenCage.Geocode;
using static Google.Apis.Auth.GoogleJsonWebSignature;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly IConfiguration _config;

        public AccountController(UserManager<AppUser> userManager, TokenService tokenService, IConfiguration config)
        {
            _config = config;
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (user == null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!result) return Unauthorized();

            return CreateUserObject(user);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email is already taken");
                return ValidationProblem();
            }
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                ModelState.AddModelError("username", "Username is already taken");
                return ValidationProblem();
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username,
                City = registerDto.City,
                Country = registerDto.Country,
                Learn = registerDto.Learn,
                Level = registerDto.Level,
                Gender = registerDto.Gender,
                Native = registerDto.Native,
                Birthday = (DateOnly)registerDto.Birthday
            };

            var gc = new Geocoder(_config["OpenCage:ApiKey"]);

            var geocoderResponse = gc.Geocode($"{registerDto.City}, {registerDto.Country}", language: "en");

            var point = geocoderResponse.Results[0].Geometry;

            if (point != null) {
                user.Lat = point.Latitude;
                user.Lng = point.Longitude;
            }
          
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);

            return CreateUserObject(user);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }

        [AllowAnonymous]
        [HttpPost("google")]
        public async Task<ActionResult<UserDto>> GoogleLogin(string accessToken)
        {
            var payload = await ValidateAsync(accessToken, new ValidationSettings
            {
                Audience = new[]
                {
                    _config["Google:ClientId"]
                }
            });

            var user = await _userManager.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.Email == payload.Email);

            if (user != null) return CreateUserObject(user);

            user = new AppUser
            {
                DisplayName = payload.Name,
                Email = payload.Email,
                UserName = payload.Email,
                Native = payload.Locale,
                Photos = new List<Photo>
                {
                    new Photo
                    {
                        Id = "google_" + payload.Subject,
                        Url = payload.Picture,
                        IsMain = true
                    }
                }
            };

            var result = await _userManager.CreateAsync(user);
            if (!result.Succeeded) return BadRequest(result.Errors);

            return CreateUserObject(user);
        }

        [Authorize]
        [HttpPost("complete")]
        public async Task<ActionResult<UserDto>> Complete(CompleteDto completeDto)
        {
            var user = await _userManager.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            
            user.City = completeDto.City;
            user.Country = completeDto.Country;
            user.Learn = completeDto.Learn;
            user.Level = completeDto.Level;
            user.Gender = completeDto.Gender;
            user.Native = completeDto.Native;
            user.Birthday = (DateOnly)completeDto.Birthday;

            var gc = new Geocoder(_config["OpenCage:ApiKey"]);

            var geocoderResponse = gc.Geocode($"{completeDto.City}, {completeDto.Country}", language: "en");

            var point = geocoderResponse.Results[0].Geometry;

            if (point != null) {
                user.Lat = point.Latitude;
                user.Lng = point.Longitude;
            }
          

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded) return BadRequest(result.Errors);

            return CreateUserObject(user);
        }

        [Authorize]
        [HttpPatch("password")]
        public async Task<ActionResult<UserDto>> ChangePassword(PasswordDto passwordDto)
        {
             var user = await _userManager.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            if (user == null) return Unauthorized();

            if (!user.PasswordHash.IsNullOrEmpty())
            {
                // User registered with a password, allow password change
                var result = await _userManager.ChangePasswordAsync(user, passwordDto.Old, passwordDto.New);
        
                if (result.Succeeded)
                {
                    return CreateUserObject(user); // Password changed successfully
                }
                else
                {
                    return BadRequest(result.Errors); // Password change failed, return error messages
                }
            }
            else
            {
                // User registered through an external provider (e.g., Google OAuth)
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var result = await _userManager.ResetPasswordAsync(user, token, passwordDto.New);
        
                if (result.Succeeded)
                {
                    return CreateUserObject(user); // Password created successfully
                }
                else
                {
                    return BadRequest(result.Errors); // Password creation failed, return error messages
                }
            }
        }


        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                PhotoUrl = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName,
                Gender = user.Gender,
                Native = user.Native
            };
        }
    }
}
