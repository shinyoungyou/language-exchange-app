using System.Text.Json;
using Application.Interfaces;
using Microsoft.Extensions.Caching.Distributed;

namespace Infrastructure.Caching
{
    public class RedisCacheService : ICacheService
    {
        private readonly IDistributedCache _cache;

        public RedisCacheService(IDistributedCache cache)
        {
            _cache = cache;
        }

        public T Get<T>(string key)
        {
            var cachedData = _cache.GetString(key);
            if (!string.IsNullOrEmpty(cachedData))
            {
                var deserializedData = JsonSerializer.Deserialize<T>(cachedData);
                if (deserializedData != null)
                {
                    return deserializedData;
                }
            }
            return default(T);
        }

        public void Set<T>(string key, T value, TimeSpan? absoluteExpiration = null)
        {
            var options = new DistributedCacheEntryOptions();
            if (absoluteExpiration.HasValue)
            {
                options.AbsoluteExpirationRelativeToNow = absoluteExpiration.Value;
            }
            var serializedData = JsonSerializer.Serialize(value);
            _cache.SetString(key, serializedData, options);
        }
    }
}
