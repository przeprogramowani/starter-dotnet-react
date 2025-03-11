using System.Text.Json.Serialization;

namespace FlashcardsAPI.Models.OpenRouter;

public class ChatCompletionRequest
{
  [JsonPropertyName("model")]
  public required string Model { get; set; }

  [JsonPropertyName("messages")]
  public required List<ChatMessage> Messages { get; set; }

  [JsonPropertyName("stream")]
  public bool Stream { get; set; } = false;

  [JsonPropertyName("max_tokens")]
  public int? MaxTokens { get; set; }

  [JsonPropertyName("temperature")]
  public float? Temperature { get; set; }
}
