export default async function handler(req, res) {
  if (req.method === "POST") {
    const { text } = req.body;

    // Enviar requisição ao Spring Boot
    const response = await fetch("http://localhost:8080/api/chatbot/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.text();
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}