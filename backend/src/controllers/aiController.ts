import { Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AuthRequest } from "../middleware/authMiddleware";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

if (!GEMINI_API_KEY) {
  console.warn(
    "GEMINI_API_KEY não está definida. O endpoint de IA não funcionará."
  );
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const getRecommendation = async (req: AuthRequest, res: Response) => {
  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ message: "Mensagem é obrigatória" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Você é um assistente da pizzaria Tri Fratelli.
Um cliente pediu uma recomendação com a seguinte preferência: "${message}"

Com base nessa preferência, recomende UM prato específico da pizzaria.
Responda APENAS no formato JSON exato abaixo, sem texto adicional:

{
  "name": "Nome do prato",
  "description": "Descrição curta do prato",
  "reason": "Explicação de por que essa é uma boa recomendação"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Obtenção do texto retornado
    let text = response.text();
    text = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    let recommendation;
    try {
      recommendation = JSON.parse(text);
    } catch (parseError) {
      console.warn("Não foi possível parsear JSON da IA. Usando fallback.");
      recommendation = {
        name: "Pizza Margherita",
        description:
          "Pizza clássica com molho de tomate, mussarela e manjericão fresco",
        reason: "Uma escolha versátil que agrada a maioria dos paladares",
      };
    }

    return res.json(recommendation);
  } catch (error: any) {
    console.error("Erro ao gerar recomendação:", error?.message || error);
    return res.status(500).json({
      message: "Erro ao gerar recomendação",
      fallback: {
        name: "Pizza Margherita",
        description:
          "Pizza clássica com molho de tomate, mussarela e manjericão fresco",
        reason: "Uma escolha versátil que agrada a maioria dos paladares",
      },
    });
  }
};
