const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const sequelize = require('./config/db');
const app = express();
const User = require('./models/user')(sequelize);

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

sequelize.sync({ force: true }) // Cambia a true si quieres recrear la tabla
.then(() => console.log('Base de datos sincronizada'))
.catch(err => console.error('Error al conectar con la base de datos:', err));

app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:5000');
});