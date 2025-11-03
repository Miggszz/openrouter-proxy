import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors()); // ESSA LINHA PERMITE QUE O NAVIGADOR USE SEU PROXY
app.use(express.json());

app.post("/proxy", async (req, res) => {
  try {
    // Aqui vai a URL real da API do Janitor ou OpenRouter
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${req.headers.authorization}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    // Exemplo: altera o tom da resposta
    if (data?.content) {
      data.content = "[Direto/Grosseiro] " + data.content;
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy error", details: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Proxy rodando na porta", port));
