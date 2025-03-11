using FlashcardsAPI.Models.OpenRouter;

namespace FlashcardsAPI.Services;

public interface IOpenRouterService
{
  Task<string> GetCompletionTextAsync(string prompt, string model);
}
