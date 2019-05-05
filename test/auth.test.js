const expect = require("expect");
const request = require("supertest");
const { server } = require("../index.js");
const { populateUsers } = require("./config/populateUsers");

describe("api/auth", () => {
  before(async () => {
    await populateUsers();
  });
  after(() => {
    server.close();
  });
  describe("POST /", () => {
    it("should login a user", async () => {
      const { body } = await request(server)
        .post("/api/auth")
        .send({ email: "Populateusers@test.com", password: "Populateusers" })
        .expect(200);
      expect(body.name).toEqual("Populate User");
      expect(body.token).toBeDefined();
    });
    it("should NOT login when wrong data was passed", async () => {
      const { body } = await request(server)
        .post("/api/auth")
        .send({ email: "InvalidEmail@test.com", password: "and password" })
        .expect(400);
      expect(body.message).toEqual("Invalid email or password");
    });
  });
});
