import { GoogleGenAI } from "@google/genai";
import { MOCK_TOURS } from "../constants";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key is missing. AI features will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const getTourRecommendation = async (userQuery: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Извините, AI помощник временно недоступен. Пожалуйста, свяжитесь с нами по телефону.";

  const toursContext = MOCK_TOURS.map(t => 
    `ID: ${t.id}, Название: ${t.title}, Описание: ${t.description}, Цена: ${t.price}, Сложность: ${t.difficulty}`
  ).join('\n');

  const systemInstruction = `
    Вы — виртуальный помощник компании Benoy Travel. Ваша цель — помочь клиенту выбрать тур.
    Доступные туры:
    ${toursContext}
    
    Ответьте клиенту на русском языке. 
    1. Если клиент спрашивает что-то общее, посоветуйте подходящий тур из списка.
    2. Будьте вежливы и кратки (не более 3 предложений).
    3. Выделите название тура жирным шрифтом.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "Я не смог найти подходящий ответ. Попробуйте уточнить запрос.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Произошла ошибка при связи с интеллектуальным помощником.";
  }
};