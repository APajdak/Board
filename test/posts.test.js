const { populateForum } = require("./config/populateForum");
const { populateThread } = require("./config/populateThread");
const { populateUsers } = require("./config/populateUsers");
const { populatePost } = require("./config/populatePost");
const expect = require("expect");
const request = require("supertest");
const server = require("../index.js");
const mongoose = require("mongoose");

let threadID, token, userSlug, postID;

const validUser = {
  name: "validUser",
  email: "validUser@tsest.com",
  password: "validUser"
};

describe("api/posts", () => {
  before(async () => {
    mongoose.models = {};
    const userData = await populateUsers(validUser);
    token = userData.token;
    userSlug = userData.slug;
    const { forumId } = await populateForum();
    const { threadId } = await populateThread(forumId, userData.authorId);
    const { _id } = await populatePost(userData.authorId, threadId);
    threadID = threadId;
    postID = _id;
  });

  after(() => {
    server.close();
  });

  describe("POST /", () => {
    it("should add new Post", async () => {
      await request(server)
        .post("/api/posts")
        .set("x-access-token", `Bearer ${token}`)
        .send({
          content: "New Post test",
          threadId: threadID
        })
        .expect(200);
    });

    it("should NOT add a new Post when invalid data passed", async () => {
      const { body } = await request(server)
        .post("/api/posts")
        .set("x-access-token", `Bearer ${token}`)
        .send({
          content: "s",
          threadId: "invalidObjectId"
        })
        .expect(400);
      expect(body.errors.content).toBeDefined();
      expect(body.errors.threadId).toBeDefined();
    });
  });

  describe("GET /:slug", () => {
    it("should return all user posts", async () => {
      const { body } = await request(server)
        .get(`/api/posts/${userSlug}`)
        .set("x-access-token", `Bearer ${token}`)
        .expect(200);

      expect(body.posts).toBeDefined();
    });

    it("should NOT return all user posts", async () => {
      await request(server)
        .get(`/api/posts/invalidSlug`)
        .set("x-access-token", `Bearer ${token}`)
        .expect(400);
    });
  });
});
