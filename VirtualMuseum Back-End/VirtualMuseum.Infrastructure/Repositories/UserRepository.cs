using Microsoft.EntityFrameworkCore;
using VirtualMuseum.Application.Interfaces;
using VirtualMuseum.Domain.Entities;
using VirtualMuseum.Infrastructure.Data;

namespace VirtualMuseum.Infrastructure.Repositories;

public class UserRepository : Repository<User>, IUserRepository
{
    public UserRepository(MuseumDbContext context) : base(context)
    {
    }

    public async Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Email == email, cancellationToken);
    }
}
