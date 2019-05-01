const { populateUsers, userOne } = require("./config/populateUsers");
const expect = require("expect");
const request = require("supertest");
const server = require("../index.js");
let token, slug;

describe("/api/users", () => {
  before(async () => {
    const userData = await populateUsers();
    token = userData.token;
    slug = userData.slug;
  });
  after(() => {
    server.close();
  });
  describe("POST /", () => {
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
        .send(userOne)
        .expect(400);
    });
  });

  describe("GET /:slug", () => {
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

  describe("PATCH /:slug", () => {
    it("should update a user data", async () => {
      const { body } = await request(server)
        .patch(`/api/users/${slug}`)
        .set("x-access-token", `Bearer ${token}`)
        .send({
          name: "update Name",
          email: "newEmail@test.com"
        })
        .expect(200);

      expect(body.name).toBe("update Name");
      expect(body.email).toBe("newEmail@test.com");
    });

    it("should NOT update a user with invalid data", async () => {
      const { body } = await request(server)
        .patch(`/api/users/${slug}`)
        .set("x-access-token", `Bearer ${token}`)
        .send({
          name: "1",
          email: "2"
        })
        .expect(400);
      expect(body.errors.name).toBeDefined();
      expect(body.errors.email).toBeDefined();
    });
  });

  describe("DELETE /:slug", () => {
    it("should delete a user", async () => {
      await request(server)
        .delete(`/api/users/${slug}`)
        .set("x-access-token", `Bearer ${token}`)
        .expect(200);
    });

    it("should NOT delete a user", async () => {
      await request(server)
        .delete(`/api/users/invalidData`)
        .set("x-access-token", `Bearer ${token}`)
        .expect(403);
    });
  });
});
