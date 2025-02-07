const request = require("supertest");
const app = require("../index");

describe("Pruebas de autenticación", () => {
  it("Debe registrar un usuario", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ nombre: "Test", email: "test@example.com", password: "123456", rol: "usuario" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
  });
});
