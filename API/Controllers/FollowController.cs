using Application.Followers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FollowController : BaseApiController
    {
        [HttpPut("{username}")]
        public async Task<IActionResult> Follow(string username)
        {
            return HandleResult(await Mediator.Send(new Add.Command
            { TargetUsername = username }));
        }
        [HttpDelete("{username}")]
        public async Task<IActionResult> Unfollow(string username)
        {
            return HandleResult(await Mediator.Send(new Delete.Command
            { TargetUsername = username }));
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetFollowings(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new List.Query { Username = username, Predicate = predicate }));
        }
    }
}

