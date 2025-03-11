namespace FlashcardsAPI.Models.OpenRouter;

public class OpenRouterOptions
{
  public const string SectionName = "OpenRouter";

  public required string ApiKey { get; set; }
  public string BaseUrl { get; set; } = "https://openrouter.ai/api/v1";
  public string? SiteUrl { get; set; }
  public string? SiteTitle { get; set; }
}
