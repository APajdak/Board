const request = require("supertest");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const { User } = require("../api/models/user");

let server = require("../index.js");

const validUser = {
  name: "userOne",
  email: "userOne@test.com",
  password: "password"
};

describe("/api/users", () => {
  afterEach(async () => {
    server.close();
  });

  describe("POST /", () => {
    beforeEach(async () => {
      await new User(validUser).save();
    });

    afterEach(async () => {
      await User.deleteMany();
    });

    it("should signup a new user", async () => {
      await request(server)
        .post("/api/users")
        .send({
          name: "UserTwo",
          email: "UserTwo@test.com",
          password: "password123"
        })
        .expect(201);
    });

    it("should NOT signup a new user when invalid data was passed", async () => {
      const { body } = await request(server)
        .post("/api/users")
        .send({
          name: "1",
          email: "2",
          password: "3"
        })
        .expect(400);
      expect(body.errors.name).toBeDefined();
      expect(body.errors.email).toBeDefined();
      expect(body.errors.password).toBeDefined();
    });

    it("should NOT singup new user when passed email is already in use", async () => {
      await request(server)
        .post("/api/users")
        .send(validUser)
        .expect(400);
    });
  });

  describe("GET /:slug", () => {
    let slug, token;
    beforeEach(async () => {
      const user = await new User({
        name: "TestUser",
        email: "validUser@test.com",
        password: "password123"
      }).save();
      token = user.createToken();
      const decoded = jwt.verify(token, JWT_SECRET);
      slug = decoded.slug;
    });
    afterEach(async () => {
      await User.deleteMany();
    });

    it("should return a valid user object", async () => {
      const { body } = await request(server)
        .get(`/api/users/${slug}`)
        .set("x-access-token", `Bearer ${token}`)
        .expect(200);
      expect(body.slug).toBe(slug);
    });

    it("should NOT return user", async () => {
      await request(server)
        .get(`/api/users/invalidSlug`)
        .set("x-access-token", `Bearer ${token}`)
        .expect(404);
    });
  });
});
