import { Router } from "express";
import {
  cadastrarLivro,
  listarLivros,
  buscarLivroPorIsbn,
} from "../controllers/livros.controller";

const router = Router();

router.post("/", cadastrarLivro);
router.get("/", listarLivros);
router.get("/:isbn", buscarLivroPorIsbn);

export default router;
