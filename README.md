# TableViewer

## Стек
![TypeScript Badge](https://img.shields.io/badge/TypeScript-informational?style=for-the-badge&logo=typescript&labelColor=rgb(30,30,46)&color=rgb(30,30,46))
![React Badge](https://img.shields.io/badge/React-informational?style=for-the-badge&logo=react&labelColor=rgb(30,30,46)&color=rgb(30,30,46))
![React_Router Badge](https://img.shields.io/badge/React_Router-informational?style=for-the-badge&logo=react-router&labelColor=rgb(30,30,46)&color=rgb(30,30,46))
![Webpack Badge](https://img.shields.io/badge/Webpack-informational?style=for-the-badge&logo=webpack&labelColor=rgb(30,30,46)&color=rgb(30,30,46))
![Tailwind Badge](https://img.shields.io/badge/Tailwind_CSS-informational?style=for-the-badge&logo=tailwind-css&labelColor=rgb(30,30,46)&color=rgb(30,30,46))
![Redux Badge](https://img.shields.io/badge/Redux-informational?style=for-the-badge&logo=redux&labelColor=rgb(30,30,46)&color=rgb(30,30,46)&logoColor=rgb(118,74,188))
![NodeJS Badge](https://img.shields.io/badge/Node.JS-informational?style=for-the-badge&logo=node.js&labelColor=rgb(30,30,46)&color=rgb(30,30,46))
![Express.js Badge](https://img.shields.io/badge/Express.JS-informational?style=for-the-badge&logo=express&labelColor=rgb(30,30,46)&color=rgb(30,30,46)&logoColor=%2361DAFB)
![Docker Badge](https://img.shields.io/badge/Docker-informational?style=for-the-badge&logo=docker&labelColor=rgb(30,30,46)&color=rgb(30,30,46))
![Nginx Badge](https://img.shields.io/badge/Nginx-informational?style=for-the-badge&logo=nginx&labelColor=rgb(30,30,46)&color=rgb(30,30,46)&logoColor=%23009639)

## Инструкция по конфигурации проекта
После клонирования репозитория необходимо для обоих директорий Frontend и Backend выполнить команду `npm i` в терминале. Далее необходимо разместить CSV файл по пути `./Backend/src/`.

## Инструкция по сборке контейнера
В корневой директории проекта в терминале необходимо выполнить команду `docker compose up --build`. После успешной сборки приложение будет работать по адресу `http://localhost:8085/` или равносильно `http://127.0.0.1:8085/`.

## Инструкция по работе с проектом на локальной машине

### Backend
Сначала вам нужно перейти в папку с частью приложения Backend: введите `cd Backend` в терминале.
Далее есть несколько команд:
- `build`: просто транспилирует TypeScript в JavaScript, транспилированный код будет находиться в папке «dist»;
- `npm run setup`: запустит сервер на порту 5122;
- `npm run start`: запустит сервер на порту 5122 с режимом *watch-mode*.

### Frontend
Сначала вам нужно перейти в папку с Frontend-частью приложения: введите `cd Frontend` в терминале.

1. Чтобы собрать проект в режиме разработки, введите в терминале: `npm run build:dev`, собранный проект появится в папке «build».
2. Чтобы собрать проект для производства, введите в терминале: `npm run build:prod`.
3. Для сборки проекта в режиме *watch-mode* необходимо ввести в терминале: `npm run start`.
4. Для того чтобы проанализировать собранный проект, необходимо указать в терминале параметр: `-- --env analyzer=true`, например, для сборки и запуска проекта в *watch-mode* необходимо ввести: `npm run start -- --env analyzer=true`, если не указать параметр, то по умолчанию будет `analyzer=false`.
5. Чтобы запустить проект в *watch-mode* на определенном порту, нужно указать в терминале параметр `-- --env port=(номер порта)`, например, чтобы собрать и запустить проект на порту 5000 в *watch-mode*, нужно ввести: `npm run start -- --env port=5000`, если не указать параметр, **по умолчанию будет порт 3000**.
