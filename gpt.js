const { OpenAIApi } = require('openai');
const fs = require('fs');
const config = require('./config');

const openai = new OpenAIApi({
    apiKey: config.gpt.token,
});

const generateDrawing = async (task, history = [], maxTokens = null) => {
    const prompt = `${task} Нарисуйте рисунок для этой задачи, используя LaTeX с пакетом TikZ. Не решайте проблему, просто нарисуйте рисунок. Не пишите комментарии, просто напишите код в формате latex. Не пиши комментарии не должны быть не какие ковычки в начале и в конце`;

    const requestBody = {
        model: "gpt-4-omni",
        messages: [{ role: "user", content: prompt }]
    };

    try {
        const response = await openai.createChatCompletion(requestBody);

        if (response && response.data.choices && response.data.choices.length > 0) {
            const latexCode = response.data.choices[0].message.content;

            fs.writeFileSync('./filePlan/plan.tex', latexCode);
            return latexCode;
        } else {
            console.error('Unexpected response format:', response);
            throw new Error('No valid response found in response');
        }
    } catch (error) {
        console.error('Error fetching response from OpenAI:', error);
        throw error;
    }
};

module.exports = { generateDrawing };
