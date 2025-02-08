const { User } = require("../models");

describe("Modelo de Usuario", () => {
  beforeEach(async () => {
    await User.sync({ force: true }); 
  });

  test("Debe crear un usuario correctamente", async () => {
    const user = await User.create({
      nombre: "nicolas",
      email: "nicolasx@gmail.com",
      password: "123456",
    });

    expect(user).toBeDefined();
    expect(user.nombre).toBe("nicolas");
    expect(user.email).toBe("nicolasx@gmail.com");
  });

  test("No debe permitir crear usuarios sin email", async () => {
    await expect(
      User.create({ nombre: "Sin Email", password: "123456" })
    ).rejects.toThrow();
  });
});
