using System.Text.Json;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class Seed
    {
        public static async Task ClearConnections(DataContext context)
        {
            context.Connections.RemoveRange(context.Connections);
            await context.SaveChangesAsync();
        }
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var userData = await File.ReadAllTextAsync("UserSeedData.json");

                var options = new JsonSerializerOptions{PropertyNameCaseInsensitive = true};

                var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

                foreach (var user in users)
                {
                    user.UserName = user.UserName.ToLower();
                    user.Created = DateTime.SpecifyKind(user.Created, DateTimeKind.Utc);
                    user.LastActive = DateTime.SpecifyKind(user.LastActive, DateTimeKind.Utc);
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    // await userManager.AddToRoleAsync(user, "Member");
                }
            }  
        }
    }
}