using System.Threading.Tasks;
using System;

namespace ToDoApp.Helper
{
    public interface ICacheService
    {
        /// <summary>
        /// Gets or add entity in cache using factory.
        /// </summary>
        /// <typeparam name="T">Type parameter.</typeparam>
        /// <param name="cacheKey">Cache key.</param>
        /// <param name="factory">Factory for creating the cahce entry.</param>
        /// <returns>Cached item.</returns>
        T GetOrAdd<T>(string cacheKey, Func<T> factory);

        /// <summary>
        /// Get or ADd delegate in cahce using factory.
        /// </summary>
        /// <typeparam name="T">Type param.</typeparam>
        /// <param name="cacheKey">cache key.</param>
        /// <param name="factory">factory.</param>
        /// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
        Task<T> GetOrAddAsync<T>(string cacheKey, Func<Task<T>> factory);

        /// <summary>
        /// Read item from cahce using factory.
        /// </summary>
        /// <typeparam name="T">Type param.</typeparam>
        /// <param name="cacheKey">cache key.</param>
        /// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
        Task<T> GetAsync<T>(string cacheKey);
    }
}
