using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VirtualMuseum.API.DTOs;
using VirtualMuseum.Domain.Entities;
using VirtualMuseum.Infrastructure.Data;

namespace VirtualMuseum.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BookingsController : ControllerBase
{
    private readonly MuseumDbContext _db;

    public BookingsController(MuseumDbContext db)
    {
        _db = db;
    }

    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<BookingResponse>), 200)]
    [ProducesResponseType(typeof(ApiResponse), 400)]
    [ProducesResponseType(typeof(ApiResponse), 401)]
    public async Task<IActionResult> Create([FromBody] CreateBookingRequest? request, CancellationToken cancellationToken)
    {
        if (request == null)
            return BadRequest(new ApiResponse(false, "Invalid request body"));

        var userIdRaw = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdRaw, out var userId))
            return Unauthorized(new ApiResponse(false, "Invalid token"));

        var booking = new Booking
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            TicketNumber = request.TicketNumber.Trim(),
            LocationId = request.LocationId.Trim(),
            LocationName = request.LocationName.Trim(),
            VisitorName = request.VisitorName.Trim(),
            VisitorEmail = request.VisitorEmail.Trim(),
            VisitorPhone = request.VisitorPhone?.Trim(),
            VisitDate = request.VisitDate,
            Guests = request.Guests,
            TotalPaid = request.TotalPaid,
            Status = "Confirmed",
            CreatedAt = DateTime.UtcNow
        };

        _db.Bookings.Add(booking);
        await _db.SaveChangesAsync(cancellationToken);

        return Ok(new ApiResponse<BookingResponse>(true, ToResponse(booking), "Booking created successfully"));
    }

    [HttpGet("my")]
    [ProducesResponseType(typeof(ApiResponse<List<BookingResponse>>), 200)]
    [ProducesResponseType(typeof(ApiResponse), 401)]
    public async Task<IActionResult> GetMyBookings(CancellationToken cancellationToken)
    {
        var userIdRaw = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (!Guid.TryParse(userIdRaw, out var userId))
            return Unauthorized(new ApiResponse(false, "Invalid token"));

        var bookings = await _db.Bookings
            .AsNoTracking()
            .Where(x => x.UserId == userId)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync(cancellationToken);

        return Ok(new ApiResponse<List<BookingResponse>>(true, bookings.Select(ToResponse).ToList()));
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(ApiResponse<List<BookingResponse>>), 200)]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var bookings = await _db.Bookings
            .AsNoTracking()
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync(cancellationToken);

        return Ok(new ApiResponse<List<BookingResponse>>(true, bookings.Select(ToResponse).ToList()));
    }

    private static BookingResponse ToResponse(Booking b) =>
        new(
            b.Id,
            b.UserId,
            b.TicketNumber,
            b.LocationId,
            b.LocationName,
            b.VisitorName,
            b.VisitorEmail,
            b.VisitorPhone,
            b.VisitDate,
            b.Guests,
            b.TotalPaid,
            b.Status,
            b.CreatedAt);
}
