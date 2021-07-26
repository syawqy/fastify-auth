# fastify-project auth untuk enablement
project authentication menggunakan JWT token. stack yang digunakan fastify,sequelize, kafka, redis dan APM
## How to run
1. install library
    ```
    npm i
    ```
2. buat file .env mengikuti contoh di bawah ini, isi variable sesuai dengan setup di pc masing-masing
    ```
    ENV=DEV
    PORT=3002
    APM_URL=
    SECRET=
    EXPIRE_TOKEN=3600
    REDIS_PORT=6379
    REDIS_HOST=
    DB_DIALECT=mssql
    DB=poc
    DB_HOST=
    DB_PORT=1433
    DB_USERNAME=sa
    DB_PASSWORD=
    KAFKA_HOST=
    ```
3. build project 
    ```
    npm run build
    ```
4. jalankan aplikasi
    ```
    npm run start
    ```
5. untuk menjalankan saat development dapat menggunakan nodemon dengan perintah ini
    ```
    npm run start:dev
    ```
6. jangan lupa menggunakan perintah ini agar perubahan code langsung di transpile dari typescript ke javascript
    ```
    npm run build:dev
    ```