import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelo do Usuário (igual ao C#)
export interface Usuario {
  id?: number;
  nome: string;
  login: string;
  senha: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5014/api/usuarios';

  constructor(private http: HttpClient) { }

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  salvar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  atualizar(usuario: Usuario): Observable<any> {
    return this.http.put(`${this.apiUrl}/${usuario.id}`, usuario);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}