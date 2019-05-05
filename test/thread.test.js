const { populateForum } = require("./config/populateForum");
const { populateThread } = require("./config/populateThread");
const { populatePost } = require("./config/populatePost");
const { populateUsers } = require("./config/populateUsers");
const expect = require("expect");
const request = require("supertest");
const { server } = require("../index.js");

let forumID, threadID, token, threadSlug;

describe("/api/threads", () => {
  before(async () => {
    const userData = await populateUsers();
    const { forumId } = await populateForum();
    const { threadId, slug } = await populateThread(forumId, userData.authorId);
    await populatePost(userData.authorId, threadId);
    token = userData.token;
    threadSlug = slug;
    forumID = forumId;
    threadID = threadId;
  });
  after(() => {
    server.close();
  });

  describe("POST /", () => {
    it("should add a new Thread", async () => {
      const response = await request(server)
        .post("/api/threads")
        .set("x-access-token", `Bearer ${token}`)
        .send({
          forumId: forumID,
          title: "Adding new thread test"
        })
        .expect(200);
      expect(JSON.parse(response.text).title).toEqual("Adding new thread test");
    });
    it("should NOT add a new Thread", async () => {
      const { body } = await request(server)
        .post("/api/threads")
        .set("x-access-token", `Bearer ${token}`)
        .send({
          forumId: "a",
          title: "A"
        })
        .expect(400);
      expect(body.errors.title).toBeDefined();
      expect(body.errors.forumId).toBeDefined();
    });
  });
  describe("GET /:slug", () => {
    it(`should return all thread's posts`, async () => {
      const { body } = await request(server)
        .get(`/api/threads/${threadSlug}`)
        .expect(200);
      expect(body.posts.length).toBe(1);
      expect(body.author).toBeDefined();
    });
    it(`should not return thread's posts`, async () => {
      await request(server)
        .get(`/api/threads/invalidSlug`)
        .expect(404);
    });
  });

  describe("PATCH /:id", () => {
    it(`should update a thread's title`, async () => {
      const { body } = await request(server)
        .patch(`/api/threads/${threadID}`)
        .set("x-access-token", `Bearer ${token}`)
        .send({ title: "Updated title" })
        .expect(200);
      expect(body.title).toEqual("Updated title");
    });
    it(`should not update a thread`, async () => {
      await request(server)
        .patch(`/api/threads/${threadID}`)
        .set("x-access-token", `Bearer ${token}`)
        .send({ title: "U" })
        .expect(400);
    });
  });

  describe("DELETE /:id", () => {
    it("should delete a thread", async () => {
      await request(server)
        .delete(`/api/threads/${threadID}`)
        .set("x-access-token", `Bearer ${token}`)
        .expect(200);
    });
    it("should NOT delete a thread", async () => {
      await request(server)
        .delete(`/api/threads/invalidId`)
        .set("x-access-token", `Bearer ${token}`)
        .expect(404);
    });
  });
});
