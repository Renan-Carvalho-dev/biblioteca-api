import express, { NextFunction, Request, Response } from "express";
import livrosRoutes from "./routes/livros.routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ mensagem: "API Biblioteca funcionando!" });
});

app.use("/livros", livrosRoutes);

// JSON malformado enviado pelo cliente -> 400
// Qualquer outro erro inesperado -> 500
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ erro: "JSON inválido" });
  }
  console.error(err);
  return res.status(500).json({ erro: "Erro interno do servidor" });
});

app.listen(PORT, () => {
  console.log(`API Biblioteca rodando em http://localhost:${PORT}`);
});
