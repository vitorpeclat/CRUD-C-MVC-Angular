# 📋 Sistema de Cadastro de Usuários (CRUD Fullstack)

> Um projeto Fullstack prático para gerenciamento de usuários, demonstrando operações essenciais de CRUD (Criar, Ler, Atualizar, Excluir).

---

## 🛠️ Tecnologias Utilizadas

| Área | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Back-End** | ![C#](https://img.shields.io/badge/C%23-.NET%208-purple) | Web API com Entity Framework |
| **Front-End** | ![Angular](https://img.shields.io/badge/Angular-17%2B-red) | Standalone Components |
| **Database** | ![MySQL](https://img.shields.io/badge/MySQL-Server-blue) | Persistência de dados |

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

* **[.NET SDK 8.0](https://dotnet.microsoft.com/download/dotnet/8.0)**
* **[Node.js](https://nodejs.org/)** (Versão LTS recomendada)
* **[MySQL Server](https://dev.mysql.com/downloads/installer/)** (ou utilize XAMPP/WAMP)

---

## 🚀 1. Configuração do Back-End (API)

### 📦 Instalação de Dependências
Abra o terminal na pasta `CadastroUsuariosApi` e execute os comandos abaixo:

```bash
# 1. Instalar ferramenta global do EF Core (necessário para migrations)
dotnet tool install --global dotnet-ef

# 2. Restaurar dependências do projeto
dotnet restore

```

🗄️ Configurar Banco de Dados
Abra o arquivo `appsettings.json` e verifique se a **Connection String** aponta corretamente para o seu MySQL local (lembre-se de ajustar a senha):

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=db_cadastro_usuarios;User=root;Password=sua_senha_aqui;"
}

```

▶️ Rodar a Aplicação
Execute o comando abaixo para iniciar o servidor.
*Nota: O código tentará criar o banco automaticamente se configurado (`EnsureCreated`) ou você pode rodar as migrations manualmente.*

```bash
dotnet run

```

> **🔔 Atenção:** Após rodar, verifique no terminal qual porta HTTP está sendo usada (ex: `http://localhost:5014`). Você precisará dela para configurar o Front-End.

---

##💻 2. Configuração do Front-End (Angular)

###📦 Instalação

Abra um **novo terminal** na pasta `CadastroUsuariosFront`:

```bash
# Instalar dependências (Angular, Bootstrap, etc)
npm install

```

###🔗 Configurar a URL da API
Abra o arquivo `src/app/api.service.ts` e ajuste a porta conforme o que está rodando no Back-End:

```typescript
// Exemplo: Se o C# rodou na porta 5014
private apiUrl = 'http://localhost:5014/api/usuarios';

```

###▶️ Rodar o Front-End
Inicie o servidor de desenvolvimento:

```bash
npx ng serve

```

Acesse a aplicação no navegador em: **http://localhost:4200**

---

##📦 Detalhes das Dependências
###Back-End (.NET)* `Microsoft.EntityFrameworkCore` (ORM)
* `Pomelo.EntityFrameworkCore.MySql` (Conector MySQL)
* `Microsoft.AspNetCore.OpenApi` / Swagger (Documentação)

###Front-End (Angular)* `@angular/common/http` (Consumo de API)
* `@angular/forms` (Manipulação de formulários)
* `Bootstrap 5` (Estilização via CDN/CSS)

---

##❓ Solução de Problemas Comuns
###1. Erro `{"isTrusted":true}` ao cadastrar* **Causa:** O Angular não consegue conectar na API.
* **Solução:** Confirme se a porta no arquivo `api.service.ts` é exatamente a mesma exibida no terminal do .NET. Verifique se a API está rodando.

###2. Erro de CORS (Bloqueio de acesso)* **Solução:** No arquivo `Program.cs` (Back-End), garanta que a linha `app.UseCors(...)` está posicionada **antes** de `app.UseAuthorization()`.

###3. Erro de SSL/HTTPS* **Solução:** Em ambiente de desenvolvimento local, comente a linha `app.UseHttpsRedirection();` no arquivo `Program.cs` para evitar erros de certificado e permitir conexões via HTTP simples.

```
