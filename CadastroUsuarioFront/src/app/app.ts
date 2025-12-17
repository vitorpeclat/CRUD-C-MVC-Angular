import { Component } from '@angular/core';
import { CrudUsuariosComponent } from './components/crud-usuarios'; // <--- Importa nosso componente

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CrudUsuariosComponent], // <--- Adiciona aqui
  template: `
    <app-crud-usuarios></app-crud-usuarios> 
  `,
  styles: []
})
export class AppComponent { }