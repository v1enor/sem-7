const express = require('express');
const router = express.Router();
const Time = require('../models/timeModel.js'); // Подключаем модель Time

// GET /api/time
router.get('/time', async (req, res) => {
  try {
    const response = await Time.find();
    res.json({ data: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
});


// POST /api/time
router.post('/time', (req, res) => {
 
    const time = new Time(req.body);
    time.save()
    .then(savedTime => {
      res.status(201).json(savedTime); // Отправляем сохранённый элемент в качестве ответа
    })
    .catch(error => {
      res.status(500).json({ message: error.message }); // Обработка ошибок
    });
});

// Другие маршруты и их обработчики
module.exports = router;