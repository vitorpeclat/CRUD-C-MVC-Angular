using CadastroUsuariosApi.Data;
using CadastroUsuariosApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace CadastroUsuariosApi.Controllers
{
    [Route("api/[controller]")] // A URL será: api/usuarios
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        // Injeção de dependência do banco de dados
        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        // 1. LISTAR TODOS (GET: api/usuarios)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            return await _context.Usuarios.ToListAsync();
        }

        // 2. CONSULTAR POR ID (GET: api/usuarios/5)
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound(); // Retorna 404 se não achar
            }

            return usuario;
        }

        // 3. CRIAR (POST: api/usuarios)
        [HttpPost]
        public async Task<ActionResult<Usuario>> PostUsuario(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            // Retorna código 201 (Created)
            return CreatedAtAction("GetUsuario", new { id = usuario.Id }, usuario);
        }

        // 4. ATUALIZAR (PUT: api/usuarios/5)
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, Usuario usuario)
        {
            if (id != usuario.Id)
            {
                return BadRequest();
            }

            // Marca o objeto como modificado
            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Usuarios.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent(); // Retorna 204 (Sucesso sem conteúdo)
        }

        // 5. EXCLUIR (DELETE: api/usuarios/5)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}