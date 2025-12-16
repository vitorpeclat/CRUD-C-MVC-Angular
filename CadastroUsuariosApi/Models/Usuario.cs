using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CadastroUsuariosApi.Models
{
    // Representa a tabela 'Usuarios' no banco de dados
    public class Usuario
    {
        [Key] // Define que é a Chave Primária
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Auto-incremento
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome é obrigatório")]
        [StringLength(100)]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "O login é obrigatório")]
        [StringLength(50)]
        public string Login { get; set; } = string.Empty;

        // Em projetos reais, senhas devem ser hash (criptografadas), 
        // mas aqui manteremos simples conforme solicitado.
        [Required(ErrorMessage = "A senha é obrigatória")]
        public string Senha { get; set; } = string.Empty;

        [Required(ErrorMessage = "O e-mail é obrigatório")]
        [EmailAddress(ErrorMessage = "Formato de e-mail inválido")]
        public string Email { get; set; } = string.Empty;
    }
}