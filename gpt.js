const axios = require('axios');
const fs = require('fs');
const config = require('./config');

const generateDrawing = async (task, history = [], maxTokens = null) => {
    const prompt = `${task} Нарисуйте рисунок для этой задачи, используя LaTeX с пакетом TikZ. Не решайте проблему, просто нарисуйте рисунок. Не пишите комментарии, просто напишите код в формате latex. Не пиши комментарии не должны быть не какие ковычки в начале и в конце`;

    const requestBody = {
        message: prompt,
        api_key: config.gpt.token,
        history: history,
        max_tokens: maxTokens
    };

    try {
        const response = await axios.post('https://ask.chadgpt.ru/api/public/gpt-4o-mini', requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.is_success) {
            const latexCode = response.data.response;

            fs.writeFileSync('./filePlan/plan.tex', latexCode);
            return latexCode;
        } else {
            console.error('Unexpected response format:', response.data);
            throw new Error('No valid response found in response');
        }
    } catch (error) {
        console.error('Error fetching response from Chad AI:', error);
        throw error;
    }
};

module.exports = { generateDrawing };
