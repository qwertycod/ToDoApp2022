using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using System;
using ToDoApp.Helper;
using ToDoApp.Services;

namespace ToDoApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<ToDoDatabaseSettings>(
               Configuration.GetSection(nameof(ToDoDatabaseSettings)));

            services.AddSingleton<IToDoDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<ToDoDatabaseSettings>>().Value);

            services.AddScoped<ToDoService>();

            services.Configure<StudentDatabaseSettings>(
               Configuration.GetSection(nameof(StudentDatabaseSettings)));

            services.AddSingleton<IStudentDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<StudentDatabaseSettings>>().Value);

            services.AddScoped<IStudentService, StudentService>();

            ConfigureCache(services);

            services.Configure<UserDatabaseSettings>(
              Configuration.GetSection(nameof(UserDatabaseSettings)));

            services.AddSingleton<IUserDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<UserDatabaseSettings>>().Value);

            services.AddSingleton<UserService>();

            services.AddControllers();

            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            services.AddScoped<IUserService, UserService>();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseMiddleware<JwtMiddleware>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }


        private void ConfigureCache(IServiceCollection services)
        {
            services.AddMemoryCache(memoryCacheOption =>
            {
                memoryCacheOption.SizeLimit = 1024;
            });

            services.AddScoped(memoryCacheOptionMethod);

            services.AddScoped<ICacheService, CacheService>();
        }
        private MemoryCacheEntryOptions memoryCacheOptionMethod(IServiceProvider serviceProvider)
        {
            return new MemoryCacheEntryOptions { 
                AbsoluteExpiration = DateTime.Now.AddMinutes(30), Size = 1,
                SlidingExpiration = TimeSpan.FromSeconds(15)};
        }
    }
}
