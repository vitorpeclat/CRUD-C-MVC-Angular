import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Usuario } from '../../api.service';

@Component({
  selector: 'app-crud-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-usuarios.html',
  styles: []
})
export class CrudUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];           // Lista completa (Banco de dados)
  usuariosFiltrados: Usuario[] = [];  // Lista exibida na tela (Filtrada)
  
  usuarioAtual: Usuario = { nome: '', login: '', senha: '', email: '' };
  
  // Variável para o campo de busca
  termoBusca: string = '';

  exibirFormularioNovo = false;
  idEdicao: number | null = null; 

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.carregarLista();
  }

  carregarLista() {
    this.api.listar().subscribe(dados => {
      this.usuarios = dados;
      this.filtrar(); // Atualiza a lista visual assim que os dados chegam
    });
  }

  // --- FUNÇÃO DE BUSCA ---
  filtrar() {
    if (!this.termoBusca) {
      // Se não tem busca, mostra tudo
      this.usuariosFiltrados = [...this.usuarios];
    } else {
      const termo = this.termoBusca.toLowerCase();
      
      this.usuariosFiltrados = this.usuarios.filter(u => 
        u.nome.toLowerCase().includes(termo) ||
        u.email.toLowerCase().includes(termo) ||
        u.id?.toString().includes(termo)
      );
    }
  }

  // --- LÓGICA DE CADASTRO/EDIÇÃO (Mantida igual) ---
  
  alternarNovoCadastro() {
    if (this.exibirFormularioNovo) {
      this.cancelar();
    } else {
      this.limpar();
      this.exibirFormularioNovo = true;
      this.idEdicao = null;
    }
  }

  editar(usuario: Usuario) {
    this.exibirFormularioNovo = false;
    this.idEdicao = usuario.id!;
    this.usuarioAtual = { ...usuario };
  }

  cancelar() {
    this.exibirFormularioNovo = false;
    this.idEdicao = null;
    this.limpar();
  }

  salvar() {
    if (!this.usuarioAtual.nome || !this.usuarioAtual.email) {
      alert('Preencha os campos obrigatórios!');
      return;
    }

    if (this.usuarioAtual.id) {
      this.api.atualizar(this.usuarioAtual).subscribe({
        next: () => {
          alert('Atualizado com sucesso!');
          this.finalizarAcao();
        },
        error: (erro: any) => alert('Erro: ' + JSON.stringify(erro.error))
      });
    } else {
      const novo = { ...this.usuarioAtual };
      delete (novo as any).id;

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