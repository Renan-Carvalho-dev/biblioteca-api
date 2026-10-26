# Biblioteca API

API REST para cadastro e consulta de livros — Node.js + Express + TypeScript.
Disciplina: Desenvolvimento Web 2 · Turma 2EMAD · Aluno: Renan Kauan Souza Carvalho

## Como executar

```bash
npm install
npm run dev
```

A API sobe em `http://localhost:3000`. Os livros ficam armazenados em memória (array).

## Endpoints

| Método | Endpoint        | Descrição                         |
|--------|-----------------|-----------------------------------|
| GET    | `/`             | Verifica se a API está funcionando |
| POST   | `/livros`       | Cadastra um livro                 |
| GET    | `/livros`       | Lista todos os livros             |
| GET    | `/livros/:isbn` | Busca um livro pelo ISBN          |

Exemplo de corpo para `POST /livros`:

```json
{
  "titulo": "O Hobbit",
  "autor": "J. R. R. Tolkien",
  "editora": "HarperCollins",
  "anoEdicao": 1937,
  "genero": "Fantasia",
  "isbn": "978-85-00000-00-1"
}
```

Códigos HTTP: `200`, `201`, `400` (dados inválidos / ISBN duplicado), `404` (ISBN inexistente), `500`.

Veja a documentação completa em `documentacao-biblioteca.pdf`.
