using FlashcardsAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlashcardsAPI.Controllers;

// ⚠ Don't do this at home! 🧘
[ApiController]
[Route("test")]
public class TestController : ControllerBase
{
    private readonly FlashcardsDbContext _dbContext;
    private readonly ILogger<TestController> _logger;
    private readonly IHostEnvironment _environment;

    public TestController(
        FlashcardsDbContext dbContext,
        ILogger<TestController> logger,
        IHostEnvironment environment)
    {
        _dbContext = dbContext;
        _logger = logger;
        _environment = environment;
    }

    [HttpDelete("cleanup")]
    public async Task<IActionResult> CleanupDatabase()
    {
        // Prevent executing in non-test environments
        if (!_environment.IsEnvironment("Test"))
        {
            _logger.LogWarning("Attempted to run test cleanup in a non-test environment");
            return Problem("This endpoint is only available in test environments");
        }

        try
        {
            _logger.LogInformation("Cleaning up test database");
            await _dbContext.Flashcards.ExecuteDeleteAsync();
            _logger.LogInformation("Test database cleaned successfully");

            return Ok(new { message = "Test database cleaned successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to clean test database");
            return Problem($"Failed to clean test database: {ex.Message}");
        }
    }
}