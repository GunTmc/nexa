# Employee Management API

## 📌 Deskripsi
Employee Management API adalah aplikasi berbasis Node.js dengan Sequelize sebagai ORM untuk mengelola data karyawan.

## 🚀 Teknologi yang Digunakan
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework Backend
- **Sequelize** - ORM untuk  MySQL
- **Validation Request** Joi js
- **File Management** path js

## 📂 Struktur Proyek
```
├── src/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── requests/
│   ├── config/
│   ├── middlewares/
│   ├── services/
│   ├── repositories/
│   ├── app.js
├── .env
├── package.json
├── README.md
```

## ⚙️ Instalasi
1. Clone repositori ini:
   ```bash
   git clone https://github.com/username/repository.git
   ```
2. Masuk ke direktori proyek:
   ```bash
   cd repository
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Konfigurasi file **.env**
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=employees_db
   DB_DIALECT=mysql
   ```
5. Docker File:
   ```bash
      FROM node:18-alpine
      WORKDIR /app
      COPY package*.json ./
      RUN npm install
      COPY . .
      EXPOSE 3000
      CMD ["npm", "start"]
   ```
6. Docker Compose:
   ```bash
      version: "3.8"

      services:
      app:
         build: .
         container_name: employee_app
         ports:
            - "3000:3000"
         volumes:
            - .:/app
            - /app/node_modules
         environment:
            - NODE_ENV=production
         command: ["npm", "start"]
   ```

## 🔥 Endpoint API
| Method | Endpoint | Deskripsi |
|--------|---------|-----------|
| POST | /auth/login | login |
| GET | /employee | Mendapatkan semua data karyawan |
| POST | /employee | Menambahkan karyawan baru |
| PATCH | /employee/:id | Mengupdate data karyawan |
| PATCH | /employee/:id/status | Mengupdate status data karyawan |

## ✨ Kontributor
- **Gunawan Prasetya** - Developer

## 📜 Lisensi
Proyek ini menggunakan lisensi MIT.

