const express = require("express");
const cors = require("cors");
require("dotenv").config();
const employeeRoutes = require("./routes/employee.routes")
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const applicationRoutes = require("./routes/application.routes");

const sequelize = require('./config/db');
const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/employeeRoutes", employeeRoutes);
app.use("/api/applicationRoutes", applicationRoutes);

sequelize.sync({ force: true }) // Cambia a true si quieres recrear la tabla
  .then(() => console.log('Base de datos sincronizada'))
  .catch(err => console.error('Error al conectar con la base de datos:', err));



if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} else {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

}