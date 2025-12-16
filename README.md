Aqui está o texto convertido para o formato Markdown, pronto para ser usado em um arquivo `README.md`.

Eu organizei a estrutura, adicionei a sintaxe correta para os blocos de código (bash, json, typescript) e garanti que os espaçamentos estejam corretos para renderização em plataformas como GitHub ou GitLab.

```markdown
# 📋 Sistema de Cadastro de Usuários (CRUD Fullstack)

Este projeto é uma aplicação Fullstack simples para gerenciamento de usuários, demonstrando operações de CRUD (Criar, Ler, Atualizar, Excluir).

* **Back-End:** C# .NET 8 (Web API)
* **Front-End:** Angular 17+ (Standalone Components)
* **Banco de Dados:** MySQL

---

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

* **[.NET SDK 8.0](https://dotnet.microsoft.com/download/dotnet/8.0)**
* **[Node.js](https://nodejs.org/)** (versão LTS recomendada)
* **[MySQL Server](https://dev.mysql.com/downloads/installer/)** (ou XAMPP/WAMP)

---

## 🚀 1. Configuração do Back-End (API)

### Instalação de Ferramentas e Dependências

Abra o terminal na pasta `CadastroUsuariosApi` e execute os comandos abaixo para restaurar os pacotes e instalar a ferramenta do Entity Framework:

```bash
# 1. Instalar ferramenta global do EF Core (necessário para migrations)
dotnet tool install --global dotnet-ef

# 2. Restaurar dependências do projeto
dotnet restore

```

###Configurar Banco de DadosAbra o arquivo `appsettings.json` e verifique se a **Connection String** está correta para o seu MySQL local (ajuste a senha se necessário):

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=db_cadastro_usuarios;User=root;Password=sua_senha_aqui;"
}

```

###Rodar a AplicaçãoExecute o comando abaixo para iniciar o servidor. Se o banco de dados não existir, o código tentará criá-lo automaticamente (se o `EnsureCreated` estiver ativo) ou você pode rodar as migrations.

```bash
dotnet run

```

> **Atenção:** Após rodar, verifique no terminal qual porta HTTP está sendo usada (ex: `http://localhost:5014`). Você precisará dela para o Front-End.

---

##💻 2. Configuração do Front-End (Angular)###InstalaçãoAbra um **novo terminal** na pasta `CadastroUsuariosFront`:

```bash
# Instalar todas as dependências do node (Angular, Bootstrap, etc)
npm install

```

###Configurar a URL da APIAbra o arquivo `src/app/api.service.ts` e certifique-se de que a porta é a mesma que o Back-End está usando:

```typescript
// Exemplo: Se o C# rodou na porta 5014
private apiUrl = 'http://localhost:5014/api/usuarios';

```

###Rodar o Front-EndInicie o servidor de desenvolvimento do Angular:

```bash
npx ng serve

```

Acesse a aplicação no navegador em: **http://localhost:4200**

---

##📦 Dependências Utilizadas###Back-End (.NET)* `Microsoft.EntityFrameworkCore` (ORM)
* `Pomelo.EntityFrameworkCore.MySql` (Conector MySQL)
* `Microsoft.AspNetCore.OpenApi` / Swagger (Documentação)

###Front-End (Angular)* `@angular/common/http` (Consumo de API)
* `@angular/forms` (Manipulação de formulários)
* `Bootstrap 5` (Estilização via CDN/CSS)

---

##❓ Solução de Problemas Comuns**1. Erro `{"isTrusted":true}` ao tentar cadastrar**

* **Causa:** O Angular não consegue conectar na API.
* **Solução:** Verifique se a porta no `api.service.ts` está igual à exibida no terminal do C#. Verifique se o C# está rodando.

**2. Erro de CORS (Bloqueio de acesso)**

* **Solução:** Garanta que no `Program.cs` do C#, a linha `app.UseCors(...)` está posicionada **antes** de `app.UseAuthorization()`.

**3. Erro de SSL/HTTPS**

* **Solução:** No ambiente de desenvolvimento, comente a linha `app.UseHttpsRedirection();` no arquivo `Program.cs` para permitir conexões via HTTP simples.

```

### O que você gostaria de fazer a seguir?
Gostaria que eu gerasse um arquivo `.gitignore` adequado para este projeto (cobrindo tanto .NET quanto Angular) para acompanhar este README?

```
