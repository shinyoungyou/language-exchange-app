using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class UserFollow
    {
        public string SourceUserId { get; set; }
        public AppUser SourceUser { get; set; }
        public string TargetUserId { get; set; }
        public AppUser TargetUser { get; set; }
    }
}