using Microsoft.Extensions.Caching.Memory;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace ToDoApp.Helper
{
    public class CacheService : ICacheService
    {
        public static readonly SemaphoreSlim Semaphore = new SemaphoreSlim(1, 1);

        private readonly IMemoryCache memoryCache;
        private readonly MemoryCacheEntryOptions memoryCacheEntryOptions;


        public CacheService(IMemoryCache memoryCache, MemoryCacheEntryOptions cacheEntryOptions)
        {
            this.memoryCache = memoryCache;
            this.memoryCacheEntryOptions = cacheEntryOptions;
        }

        public void Dispose() { }

        public T GetOrAdd<T>(string cacheKey, Func<T> factory)
        {
            if (factory == null)
            {
                throw new ArgumentNullException(nameof(factory));
            }

            if (memoryCache.TryGetValue<T>(cacheKey, out var result))
            {
                return result;
            }

            lock (TypeLock<T>.Lock) // making sure only one thread can access this at a time
            {
                if(memoryCache.TryGetValue<T>(cacheKey, out  result))
                {
                    return result;
                }

                result = factory();
                memoryCache.Set(cacheKey, result, memoryCacheEntryOptions);

                return result;
            }
        }

        public async Task<T> GetOrAddAsync<T>(string cacheKey, Func<Task<T>> factory)
        {
            if(memoryCache.TryGetValue<T>(cacheKey, out var result)){
                return result;
            }
            try
            {
                await Semaphore.WaitAsync().ConfigureAwait(false);  // making sure only one thread can access this at a time in async mode also
                if (memoryCache.TryGetValue<T>(cacheKey,out result))
                {
                    return result;
                }

                result = await factory().ConfigureAwait(false);
                if (result != null)
                {
                    memoryCache.Set(cacheKey, result, memoryCacheEntryOptions);
                }
            }
            finally
            {
                Semaphore.Release();
            }

            return result;
        }

        public async Task<T?> GetAsync<T>(string cacheKey)
        {
            if (memoryCache.TryGetValue<T>(cacheKey, out T result))
            {
                return result;
            }

            return default;
        }

        private static class TypeLock<T>
        {
            public static object Lock = new object();
        }
    }
}
