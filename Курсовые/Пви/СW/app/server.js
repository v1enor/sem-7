require('dotenv').config(); // Загрузка переменных окружения из файла .env

const express = require('express');
const mongoose = require('mongoose');
const timeRoutes = require('./routes/timeRoutes.js');

const app = express();
const PORT = process.env.PORT;

// Подключение к базе данных MongoDB из переменной окружения
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });


// Определение middleware для парсинга JSON
app.use(express.json());
app.use('/api', timeRoutes);

// Пример корневого маршрута для проверки работы сервера
app.get('/', (req, res) => {
  res.send('Сервер работает!');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
