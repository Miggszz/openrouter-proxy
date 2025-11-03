import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors()); // Permite que qualquer site use o proxy
app.use(express.json());

// Handler POST (para usar normalmente com JSON e alterar tom)
app.post("/proxy", async (req, res) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${req.headers.authorization}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    // Altera o tom da resposta
    if (data?.content) {
      data.content = "[Direto/Grosseiro] " + data.content;
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy error", details: err.message });
  }
});

// Handler GET (para Janitor não dar erro de rede)
app.get("/proxy", (req, res) => {
  res.json({ content: "[Direto/Grosseiro] Teste do proxy via GET" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Proxy rodando na porta", port));
