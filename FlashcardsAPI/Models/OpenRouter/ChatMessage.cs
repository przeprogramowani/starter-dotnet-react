using System.Text.Json.Serialization;

namespace FlashcardsAPI.Models.OpenRouter;

public class ChatMessage
{
  [JsonPropertyName("role")]
  public required string Role { get; set; }

  [JsonPropertyName("content")]
  public required string Content { get; set; }
}