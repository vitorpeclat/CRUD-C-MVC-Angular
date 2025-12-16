using CadastroUsuariosApi.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configuração do MySQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// --- INICIO DO BLOCO DE CRIAÇÃO AUTOMÁTICA ---
// Cria um escopo temporário para pegar o contexto do banco
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        // Pega o contexto do banco de dados
        var context = services.GetRequiredService<AppDbContext>();
        
        // ESTA LINHA MÁGICA CRIA O BANCO SE ELE NÃO EXISTIR:
        context.Database.EnsureCreated(); 
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Erro ao criar o banco de dados: {ex.Message}");
    }
}
// --- FIM DO BLOCO ---

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();