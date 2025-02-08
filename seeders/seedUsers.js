const { User } = require("../models");
const sequelize = require("../config/db")
async function seedUsers() {
  await sequelize.sync(); 

  await User.create(
    { name: "Admin", email: "admin@example.com", password: "123456", role: "admin" },
  );


  console.log("Usuarios creados correctamente.");
  process.exit(); // Cierra el script
}

seedUsers().catch((error) => {
  console.error("Error al ejecutar el seeder:", error);
  process.exit(1);
});
