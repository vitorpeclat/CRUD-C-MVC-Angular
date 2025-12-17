import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Usuario } from '../../api.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-crud-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './crud-usuarios.html',
  styleUrls: ['./crud-usuarios.css'],
  
  animations: [
    trigger('expandirFechar', [
      transition(':enter', [
        style({ height: '0px', opacity: 0, overflow: 'hidden' }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1, overflow: 'hidden' }),
        animate('300ms ease-in', style({ height: '0px', opacity: 0 }))
      ])
    ])
  ]
})
export class CrudUsuariosComponent implements OnInit {
  
  // Lista principal que recebe dados do backend
  usuarios: Usuario[] = [];
  // Lista secundária usada na tela (permite filtrar sem perder os dados originais)
  usuariosFiltrados: Usuario[] = [];
  
  usuarioAtual: Usuario = { nome: '', login: '', senha: '', email: '' };
  
  termoBusca: string = ''; // Variável ligada ao input de pesquisa
  exibirFormularioNovo = false; // Controla se o card de "Novo Usuário" aparece ou não
  idEdicao: number | null = null; // Guarda o ID do usuário que está sendo editado (null = nenhum)

  constructor(private api: ApiService) {}

  // ngOnInit é executado assim que o componente termina de carregar
  ngOnInit() {
    this.carregarLista();
  }

  // Busca os dados no Back-end
  carregarLista() {
    this.api.listar().subscribe({
      next: (dados) => {
        this.usuarios = dados;
        this.filtrar(); // Atualiza a lista filtrada assim que os dados chegam
      },
      error: (erro) => {
        console.error('Erro:', erro);
        alert('Erro ao carregar dados. Verifique a conexão.');
      }
    });
  }

  // Função de busca
  filtrar() {
    if (!this.termoBusca) {
      // Se não tem busca, a lista filtrada é uma cópia exata ([...]) da original
      this.usuariosFiltrados = [...this.usuarios];
    } else {
      const termo = this.termoBusca.toLowerCase();
      // Filtra por nome, email ou ID
      this.usuariosFiltrados = this.usuarios.filter(u => 
        u.nome.toLowerCase().includes(termo) ||
        u.email.toLowerCase().includes(termo) ||
        u.id?.toString().includes(termo)
      );
    }
  }

  // Validação de Senha
  // Regra: Pelo menos 1 Maiúscula, 1 Especial e 6 caracteres no total
  validarSenha(senha: string): boolean {
    if (!senha) return false;
    const regex = /^(?=.*[A-Z])(?=.*[!@#$&*]).{6,}$/;
    return regex.test(senha);
  }

  // Validação de Email
  // Regra: texto + @ + texto + . + extensão (ex: .com)
  validarEmail(email: string): boolean {
    if (!email) return false;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }


  // Alterna a visibilidade do formulário de criação
  alternarNovoCadastro() {
    if (this.exibirFormularioNovo) {
      this.cancelar(); // Fecha se estiver aberto
    } else {
      this.limpar(); // Limpa o formulário antigo
      this.exibirFormularioNovo = true; // Abre o novo
      this.idEdicao = null; // Garante que não é edição
    }
  }

  // Prepara o formulário para edição de um usuário específico
  editar(usuario: Usuario) {
    this.exibirFormularioNovo = false; // Fecha o form de criação (topo) se estiver aberto
    this.idEdicao = usuario.id!; // Define qual linha da tabela vai se expandir
    
    // Clona o objeto usuário ({...}) para evitar que a edição altere a tabela em tempo real antes de salvar
    this.usuarioAtual = { ...usuario };
  }

  // Cancela a operação atual e reseta a tela
  cancelar() {
    this.exibirFormularioNovo = false;
    this.idEdicao = null;
    this.limpar();
  }


  salvar() {
    // Validação de preenchimento básico
    if (!this.usuarioAtual.nome) {
      alert('O nome é obrigatório!');
      return;
    }

    // Validações de segurança e formato
    if (!this.validarSenha(this.usuarioAtual.senha)) {
      alert('A senha não atende aos requisitos de segurança!');
      return;
    }

    if (!this.validarEmail(this.usuarioAtual.email)) {
      alert('O e-mail informado é inválido!');
      return;
    }

    // Create (POST) ou Update (PUT)
    if (this.usuarioAtual.id) {
      // Se tem ID, é uma ATUALIZAÇÃO
      this.api.atualizar(this.usuarioAtual).subscribe({
        next: () => {
          alert('Atualizado com sucesso!');
          this.finalizarAcao();
        },
        error: (erro: any) => alert('Erro: ' + JSON.stringify(erro.error))
      });
    } else {
      // Se não tem ID, é uma CRIAÇÃO
      const novo = { ...this.usuarioAtual };
      delete (novo as any).id; // Remove a propriedade ID (o banco gera)

      this.api.salvar(novo).subscribe({
        next: () => {
          alert('Cadastrado com sucesso!');
          this.finalizarAcao();
        },
        error: (erro: any) => alert('Erro: ' + JSON.stringify(erro.error))
      });
    }
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir?')) {
      this.api.excluir(id).subscribe(() => {
        this.carregarLista();
      });
    }
  }

  finalizarAcao() {
    this.carregarLista();
    this.exibirFormularioNovo = false;
    this.idEdicao = null;
    this.limpar();
  }

  limpar() {
    this.usuarioAtual = { nome: '', login: '', senha: '', email: '' };
  }
}