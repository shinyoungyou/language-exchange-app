using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Messages
{
    public class RemoveFromMessageGroup
    {
        public class Command : IRequest<Result<Group>>
        {
            public string ConnectionId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Group>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Group>> Handle(Command request, CancellationToken cancellationToken)
            {
                var group = await _context.Groups
                    .Include(x => x.Connections)
                    .Where(x => x.Connections.Any(c => c.ConnectionId == request.ConnectionId))
                    .FirstOrDefaultAsync();
                
                var connection = group.Connections.FirstOrDefault(x => x.ConnectionId == request.ConnectionId);
                
                _context.Connections.Remove(connection);
                
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Group>.Success(group);

                return Result<Group>.Failure("Failed to remove from group");
            }
        }
    }
}