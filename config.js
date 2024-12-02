const config = {
    bot: {
        token: '#',
    },
    gpt: {
        token: '#',
    },
    group: {
        id: '#',
    },
	model: {
		gpt: 'gpt-3.5-turbo',
	},
	content: {
		prompt: 'Нарисуйте рисунок для этой задачи, используя LaTeX с пакетом TikZ. Не решайте проблему, просто нарисуйте рисунок. Не пишите комментарии, просто напишите код в формате latex. Не пиши комментарии не должны быть не какие ковычки в начале и в конце;',
	},
    latex: {
        pdfOutputPath: './filePlan/plan.pdf',
        texFilePath: './filePlan/plan.tex',
    }
};

module.exports = config;

