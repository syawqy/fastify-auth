# fastify-project auth untuk enablement
project authentication menggunakan JWT token. stack yang digunakan fastify,sequelize, kafka, redis dan APM
## How to run
1. install library
    ```
    npm i
    ```
2. build project 
    ```
    npm run build
    ```
3. jalankan aplikasi
    ```
    npm run start
    ```
4. untuk menjalankan saat development dapat menggunakan nodemon dengan perintah ini
    ```
    npm run start:dev
    ```
5. jangan lupa menggunakan perintah ini agar perubahan code langsung di transpile dari typescript ke javascript
    ```
    npm run build:dev
    ```