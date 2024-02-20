using Microsoft.EntityFrameworkCore;
namespace backend.Data;
using backend.Models;

public class ApiContext : DbContext 
{
    public ApiContext(DbContextOptions<ApiContext> options) : base(options)
    {
    }

    public DbSet<Paste> Pastes { get; set; } = null!;
}