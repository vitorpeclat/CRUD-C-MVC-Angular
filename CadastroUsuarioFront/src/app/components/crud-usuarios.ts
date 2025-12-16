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
  usuarios: Usuario[] = [];
  
  // Objeto para o formulário
  usuarioAtual: Usuario = { nome: '', login: '', senha: '', email: '' };
  modoEdicao = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.carregarLista();
  }

  carregarLista() {
    this.api.listar().subscribe(dados => {
      this.usuarios = dados;
    });
  }

  salvar() {
    // Validação simples
    if (!this.usuarioAtual.nome || !this.usuarioAtual.email) {
      alert('Preencha os campos obrigatórios!');
      return;
    }

    if (this.modoEdicao && this.usuarioAtual.id) {
      // ATUALIZAR
      this.api.atualizar(this.usuarioAtual).subscribe({
        next: () => {
          alert('Atualizado com sucesso!');
          this.limpar();
          this.carregarLista();
        },
        error: (erro: any) => { // <--- CORREÇÃO 1: Tipar erro como any
          alert('Erro ao atualizar: ' + JSON.stringify(erro.error));
        }
      });
    } else {
      // CRIAR
      const novo = { ...this.usuarioAtual };
      
      // <--- CORREÇÃO 2: Cast para 'any' para permitir o delete sem erro no TypeScript
      delete (novo as any).id; 

      this.api.salvar(novo).subscribe({
        next: () => {
          alert('Cadastrado com sucesso!');
          this.limpar();
          this.carregarLista();
        },
        error: (erro: any) => { // <--- CORREÇÃO 1: Tipar erro como any
          alert('Erro ao cadastrar: ' + JSON.stringify(erro.error));
        }
      });
    }
  }

  editar(usuario: Usuario) {
    this.usuarioAtual = { ...usuario };
    this.modoEdicao = true;
  }

  excluir(id: number) {
    if (confirm('Deseja realmente excluir?')) {
      this.api.excluir(id).subscribe(() => {
        this.carregarLista();
      });
    }
  }

  limpar() {
    this.usuarioAtual = { nome: '', login: '', senha: '', email: '' };
    this.modoEdicao = false;
  }
}