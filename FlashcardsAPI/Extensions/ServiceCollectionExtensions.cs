using FlashcardsAPI.Data;
using FlashcardsAPI.Models.OpenRouter;
using FlashcardsAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace FlashcardsAPI.Extensions;

public static class ServiceCollectionExtensions
{
  public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
  {
    // Register database context
    services.AddDbContext<FlashcardsDbContext>(options =>
        options.UseSqlite(configuration.GetConnectionString("DefaultConnection")));

    services.Configure<OpenRouterOptions>(configuration.GetSection("OpenRouter"));
    services.AddHttpClient<IOpenRouterService, OpenRouterService>();

    services.AddScoped<IFlashcardRepository, FlashcardRepository>();

    return services;
  }


  public static IServiceCollection AddCorsConfiguration(this IServiceCollection services)
  {
    services.AddCors(options =>
    {
      options.AddPolicy("CorsPolicy",
              builder => builder
                  .WithOrigins("http://localhost:3000")
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials());
    });

    return services;
  }

  public static IServiceCollection AddFlashcardsServices(this IServiceCollection services)
  {
    // Register HttpClient for OpenRouter
    services.AddHttpClient<IOpenRouterService, OpenRouterService>();

    // Register services
    services.AddScoped<IOpenRouterService, OpenRouterService>();

    return services;
  }
}
