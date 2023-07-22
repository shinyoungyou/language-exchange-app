using Application.Members;
using Application.Messages;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            string currentUsername = null;
            CreateMap<AppUser, Member>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src =>  src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.Birthday.CalculateAge()))
                .ForMember(dest => dest.FollowersCount, opt => opt.MapFrom(u => u.Followers.Count))
                .ForMember(dest => dest.FollowingCount, opt => opt.MapFrom(u => u.Followings.Count))
                .ForMember(dest => dest.Following,
                    o => o.MapFrom(s => s.Followers.Any(x => x.SourceUser.UserName == currentUsername)));
            CreateMap<Message, MessageDto>()
                .ForMember(dest => dest.SenderPhotoUrl, opt => opt.MapFrom(u => u.Sender.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.RecipientPhotoUrl, opt => opt.MapFrom(u => u.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<DateTime, DateTime>().ConvertUsing(d => DateTime.SpecifyKind(d, DateTimeKind.Utc));
            // for the optional dateRead 
            CreateMap<DateTime?, DateTime?>().ConvertUsing(d => d.HasValue ? DateTime.SpecifyKind(d.Value, DateTimeKind.Utc) : null);
        }
    }
}