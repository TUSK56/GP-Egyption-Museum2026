using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VirtualMuseum.API.DTOs;
using VirtualMuseum.Application.Services;
using VirtualMuseum.Domain.Entities;

namespace VirtualMuseum.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ArtifactsController : ControllerBase
{
    private readonly ArtifactService _artifactService;
    private readonly ILogger<ArtifactsController> _logger;

    public ArtifactsController(ArtifactService artifactService, ILogger<ArtifactsController> logger)
    {
        _artifactService = artifactService;
        _logger = logger;
    }

    [HttpGet]
    [AllowAnonymous]
    [ProducesResponseType(typeof(ApiResponse<IEnumerable<Artifact>>), 200)]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var artifacts = await _artifactService.GetAllAsync(cancellationToken);
        return Ok(new ApiResponse<IEnumerable<Artifact>>(true, artifacts));
    }

    [HttpGet("{id:guid}")]
    [AllowAnonymous]
    [ProducesResponseType(typeof(ApiResponse<Artifact>), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
    {
        var artifact = await _artifactService.GetByIdAsync(id, cancellationToken);
        if (artifact == null)
            return NotFound(new ApiResponse(false, "Artifact not found"));
        return Ok(new ApiResponse<Artifact>(true, artifact));
    }

    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<Artifact>), 201)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> Create([FromBody] Artifact? artifact, CancellationToken cancellationToken)
    {
        if (artifact == null)
            return BadRequest(new ApiResponse(false, "Invalid request body"));
        var created = await _artifactService.CreateAsync(artifact, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, new ApiResponse<Artifact>(true, created));
    }

    [HttpPut("{id:guid}")]
    [ProducesResponseType(typeof(ApiResponse<Artifact>), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update(Guid id, [FromBody] Artifact? artifact, CancellationToken cancellationToken)
    {
        if (artifact == null)
            return BadRequest(new ApiResponse(false, "Invalid request body"));
        var existing = await _artifactService.GetByIdAsync(id, cancellationToken);
        if (existing == null)
            return NotFound(new ApiResponse(false, "Artifact not found"));
        existing.Slug = artifact.Slug;
        existing.EraId = artifact.EraId;
        existing.CategoryId = artifact.CategoryId;
        existing.MaterialId = artifact.MaterialId;
        existing.DiscoveryLocationId = artifact.DiscoveryLocationId;
        existing.ModelFileId = artifact.ModelFileId;
        existing.ThumbnailFileId = artifact.ThumbnailFileId;
        existing.Height = artifact.Height;
        existing.Width = artifact.Width;
        existing.Depth = artifact.Depth;
        existing.Weight = artifact.Weight;
        existing.CreatedBy = artifact.CreatedBy;
        await _artifactService.UpdateAsync(existing, cancellationToken);
        return Ok(new ApiResponse<Artifact>(true, existing));
    }

    [HttpDelete("{id:guid}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var artifact = await _artifactService.GetByIdAsync(id, cancellationToken);
        if (artifact == null)
            return NotFound(new ApiResponse(false, "Artifact not found"));
        await _artifactService.DeleteAsync(artifact, cancellationToken);
        return NoContent();
    }
}
