const { populateForum } = require("./config/populateForum");
const { populateThread } = require("./config/populateThread");
const { populatePost } = require("./config/populatePost");
const { populateUsers } = require("./config/populateUsers");
const expect = require("expect");
const request = require("supertest");
const server = require("../index.js");

let forumID, token, threadSlug;

describe("/api/threads", () => {
  before(async () => {
    const userData = await populateUsers();
    const { forumId } = await populateForum();
    const { threadId, slug } = await populateThread(forumId, userData.authorId);
    await populatePost(userData.authorId, threadId);
    token = userData.token;
    threadSlug = slug;
    forumID = forumId;
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
});
