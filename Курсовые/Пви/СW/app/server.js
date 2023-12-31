const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const managerRoutes = require("./routes/managerRoutes.js");
const projectsRoutes = require("./routes/projectsRoutes.js");
const teamRoutes = require("./routes/teamRoutes.js");
const taskRoutes = require("./routes/taskRoutes.js");
const eventRoutes = require("./routes/eventRoutes.js");

require("dotenv").config(); // Загрузка переменных окружения из файла .env

const app = express();
app.use(cors());

const PORT = process.env.SERVER_PORT;

// Подключение к базе данных MongoDB из переменной окружения
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    console.log(process.env.MONGODB_URI)
  });

// Определение middleware для парсинга JSON
app.use(express.json());

app.use("/api", userRoutes);
app.use("/admin", adminRoutes);
app.use("/manager", managerRoutes);
app.use("/project", projectsRoutes);
app.use("/team", teamRoutes);
app.use("/task", taskRoutes);
app.use("/event", eventRoutes);


app.get("/", (req, res) => {
  res.send("Сервер работает!");
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
