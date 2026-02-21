
import { GoogleGenAI } from "@google/genai";

// Always use exact initialization format
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getLegalAdvice = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      // Legal advice involves complex reasoning, upgrade to pro model
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: `Você é o assistente virtual da JUSDATAS, uma plataforma jurídica de elite. 
        Seu objetivo é ajudar advogados com dúvidas sobre o ordenamento jurídico brasileiro, 
        sugerir teses, resumir decisões e analisar riscos processuais. 
        Sempre use uma linguagem profissional, técnica e objetiva. 
        Não substitua a consulta a um advogado humano, apenas dê suporte.`,
      },
    });
    // Property access .text is correct for GenerateContentResponse
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, tive um problema ao processar sua consulta jurídica. Verifique sua conexão ou tente novamente mais tarde.";
  }
};

export const getComparativeLaw = async (theme: string, countries: string[]) => {
  const prompt = `Compare a legislação sobre "${theme}" entre o Brasil e ${countries.join(", ")}. 
  Crie uma tabela comparativa com os pontos principais de cada jurisdição.`;
  
  try {
    const response = await ai.models.generateContent({
      // Comparative law is a complex analytical task
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: `Você é um especialista em Direito Comparado. Sua tarefa é fornecer comparações precisas entre o Direito Brasileiro e estrangeiro.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Comparative Law Error:", error);
    return "Erro ao realizar comparação de direito internacional.";
  }
};
