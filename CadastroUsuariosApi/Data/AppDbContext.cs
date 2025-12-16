using CadastroUsuariosApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CadastroUsuariosApi.Data
{
    public class AppDbContext : DbContext
    {
        // Construtor que recebe as configurações (connection string)
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Define a tabela de Usuários
        public DbSet<Usuario> Usuarios { get; set; }
    }
}