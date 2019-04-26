const request = require("supertest");
const { User } = require("../api/models/user");

let server;

describe("/api/users", () => {
  beforeEach(() => {
    server = require("../index.js");
  });
  afterEach(async () => {
    server.close();
    await User.deleteMany();
  });

  describe("GET /", () => {
    it("should signup a new user", async () => {
      await request(server)
        .post("/api/users")
        .send({
          name: "UserTwo",
          email: "UserTwo@test.com",
          password: "123456"
        })
        .expect(201);
    });
  });
  describe("GET /:slug", () => {
    it("should return a user if valid slug is passed", () => {});
  });
});
