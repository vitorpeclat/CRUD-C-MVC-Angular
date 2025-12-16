import { Component } from '@angular/core';
import { CrudUsuariosComponent } from './components/crud-usuarios'; // <--- Importa nosso componente

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CrudUsuariosComponent], // <--- Adiciona aqui
  template: `
    <nav class="navbar navbar-dark bg-dark mb-3">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">Sistema Angular + C#</span>
      </div>
    </nav>
    
    <app-crud-usuarios></app-crud-usuarios> 
  `,
  styles: []
})
export class AppComponent { }