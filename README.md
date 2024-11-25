# Название проекта

Бот геометр - телеграм-бот должен отправить чертеж для ее решения.

## Требования

Перед запуском убедитесь, что установлен: https://nodejs.org/en
Изменить данные в config:
bot.token на свой токен чат бота.
gpt.token на свой токен.
group.id на индификатор своей группы (беседы)
 остальное не трогать!!!

## Установка

https://miktex.org/ (или любой другой)

Библиотеки:
$npm install telegraf
$npm install openai

## Запуск

На локалке:

cd [путь к папке где находится бот]
node bot.js (либо воспользоваться run.bat)

На хостинге:

cd [путь к папке где находится бот] 
node bot.js
либо же через: pm2 start bot.js 
