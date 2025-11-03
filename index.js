import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// Apenas GET simples, sem headers, sem POST
app.get("/proxy", (req, res) => {
  res.json({
    content: "[Direto/Grosseiro] Esta é a resposta do proxy para Janitor"
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Proxy rodando na porta", port));
