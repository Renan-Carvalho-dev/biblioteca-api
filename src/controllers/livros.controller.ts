import { Request, Response } from "express";
import { Livro } from "../models/livro";

// Armazenamento em memória
const livros: Livro[] = [];

const camposTexto = ["titulo", "autor", "editora", "genero", "isbn"] as const;

// Retorna a mensagem de erro de validação, ou null se os dados forem válidos
function validarLivro(body: any): string | null {
  if (!body || typeof body !== "object") {
    return "Corpo da requisição inválido";
  }

  for (const campo of camposTexto) {
    const valor = body[campo];
    if (typeof valor !== "string" || valor.trim() === "") {
      return `O campo ${campo} é obrigatório`;
    }
  }

  if (body.anoEdicao === undefined || body.anoEdicao === null || body.anoEdicao === "") {
    return "O campo anoEdicao é obrigatório";
  }
  if (typeof body.anoEdicao !== "number" || !Number.isFinite(body.anoEdicao)) {
    return "O campo anoEdicao deve ser numérico";
  }

  return null;
}

export function cadastrarLivro(req: Request, res: Response) {
  const erro = validarLivro(req.body);
  if (erro) {
    return res.status(400).json({ erro });
  }

  const isbn = req.body.isbn.trim();
  if (livros.some((l) => l.isbn === isbn)) {
    return res.status(400).json({ erro: "Já existe um livro cadastrado com este ISBN" });
  }

  const livro: Livro = {
    titulo: req.body.titulo.trim(),
    autor: req.body.autor.trim(),
    editora: req.body.editora.trim(),
    anoEdicao: req.body.anoEdicao,
    genero: req.body.genero.trim(),
    isbn,
  };

  livros.push(livro);
  return res.status(201).json(livro);
}

export function listarLivros(_req: Request, res: Response) {
  return res.status(200).json(livros);
}

export function buscarLivroPorIsbn(req: Request, res: Response) {
  const livro = livros.find((l) => l.isbn === req.params.isbn);
  if (!livro) {
    return res.status(404).json({ erro: "Livro não encontrado" });
  }
  return res.status(200).json(livro);
}
