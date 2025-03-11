using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using FlashcardsAPI.Models.OpenRouter;

namespace FlashcardsAPI.Services;

public class OpenRouterService : IOpenRouterService
{
  private readonly HttpClient _httpClient;
  private readonly IConfiguration _configuration;
  private readonly ILogger<OpenRouterService> _logger;

  public OpenRouterService(HttpClient httpClient, IConfiguration configuration, ILogger<OpenRouterService> logger)
  {
    _httpClient = httpClient;
    _configuration = configuration;
    _logger = logger;

    _httpClient.BaseAddress = new Uri("https://openrouter.ai/api/v1/");
    string apiKey = _configuration["OpenRouter:ApiKey"] ??
        throw new InvalidOperationException("OpenRouter API key is not configured");

    _httpClient.DefaultRequestHeaders.Authorization =
        new AuthenticationHeaderValue("Bearer", apiKey);
    _httpClient.DefaultRequestHeaders.Add("HTTP-Referer", "https://github.com/przeprogramowani/Flashcards");
  }

  public async Task<string> GetCompletionTextAsync(string prompt, string model)
  {
    try
    {
      var result = await ChatCompletionAsync(
          model,
          new List<ChatMessage>
          {
                    new() { Role = "system", Content = "You are a helpful assistant." },
                    new() { Role = "user", Content = prompt }
          },
          temperature: null
      );

      return result?.Choices?.FirstOrDefault()?.Message?.Content ??
             throw new InvalidOperationException("No valid response content received from AI service");
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, "Error getting completion from OpenRouter API");
      throw;
    }
  }

  private async Task<ChatCompletionResponse?> ChatCompletionAsync(
      string model,
      List<ChatMessage> messages,
      float? temperature = 0.7f,
      int? maxTokens = null)
  {
    try
    {
      var request = new ChatCompletionRequest
      {
        Model = model,
        Messages = messages,
        Temperature = temperature,
        MaxTokens = maxTokens
      };

      var requestJson = JsonSerializer.Serialize(request, new JsonSerializerOptions
      {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
      });

      var content = new StringContent(requestJson, Encoding.UTF8, "application/json");
      var response = await _httpClient.PostAsync("chat/completions", content);

      var rawResponseContent = await response.Content.ReadAsStringAsync();

      var result = JsonSerializer.Deserialize<ChatCompletionResponse>(
          rawResponseContent,
          new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
      );

      return result;
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, "Unexpected error communicating with OpenRouter API");
      throw;
    }
  }
}
