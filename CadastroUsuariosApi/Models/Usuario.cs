using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CadastroUsuariosApi.Models
{
    public class Usuario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome é obrigatório")]
        [StringLength(100)]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "O login é obrigatório")]
        [StringLength(50)]
        public string Login { get; set; } = string.Empty;

        [Required(ErrorMessage = "A senha é obrigatória")]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$", 
            ErrorMessage = "A senha deve conter uma letra maiúscula, um caractere especial e no mínimo 6 dígitos.")]
        public string Senha { get; set; } = string.Empty;

        [Required(ErrorMessage = "O e-mail é obrigatório")]
        [RegularExpression(@"^.+@.+\..+$", ErrorMessage = "O e-mail deve seguir o formato email@dominio.com")]
        public string Email { get; set; } = string.Empty;
    }
}