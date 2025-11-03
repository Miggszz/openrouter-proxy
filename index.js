import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

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
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy error", details: err.message });
  }
});

app.listen(3000, () => console.log("Proxy rodando na porta 3000"));
