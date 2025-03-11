using System.Text.Json.Serialization;

namespace FlashcardsAPI.Models.OpenRouter;

public class ChatCompletionResponse
{
  [JsonPropertyName("id")]
  public required string Id { get; set; }

  [JsonPropertyName("choices")]
  public required List<Choice> Choices { get; set; }

  [JsonPropertyName("created")]
  public long Created { get; set; }

  [JsonPropertyName("model")]
  public required string Model { get; set; }

  [JsonPropertyName("object")]
  public required string Object { get; set; }

  [JsonPropertyName("usage")]
  public Usage? Usage { get; set; }
}
