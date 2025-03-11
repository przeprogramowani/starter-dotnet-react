using System.Text.Json.Serialization;

namespace FlashcardsAPI.Models.OpenRouter;

public class Choice
{
  [JsonPropertyName("finish_reason")]
  public string? FinishReason { get; set; }

  [JsonPropertyName("native_finish_reason")]
  public string? NativeFinishReason { get; set; }

  [JsonPropertyName("message")]
  public ChatMessage? Message { get; set; }
}