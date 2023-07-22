using Application.Core;
using Application.Interfaces;
using Application.Members;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class List
    {
        public class Query : IRequest<Result<List<Member>>>
        {
            public string Predicate { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Member>>>
        {
            private readonly DataContext _context;

            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<Member>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var members = new List<Member>();

                switch (request.Predicate)
                {
                    case "followers":
                        members = await _context.UserFollows.Where(u => u.TargetUser.UserName == request.Username)
                            .Select(u => u.SourceUser)
                            .ProjectTo<Member>(_mapper.ConfigurationProvider, 
                                new {currentUsername = _userAccessor.GetUsername()})
                            .ToListAsync();
                        break;
                    case "following":
                        members = await _context.UserFollows.Where(u => u.SourceUser.UserName == request.Username)
                            .Select(u => u.TargetUser)
                            .ProjectTo<Member>(_mapper.ConfigurationProvider, 
                                new {currentUsername = _userAccessor.GetUsername()})
                            .ToListAsync();
                        break;
                }

                return Result<List<Member>>.Success(members);
            }
        }
    }
}