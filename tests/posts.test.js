const request = require("supertest");
const { populateForum } = require("./config/populateForum");
const { populateThread } = require("./config/populateThread");
const { populateUsers } = require("./config/populateUsers");
const { populatePost } = require("./config/populatePost");
const { User } = require("../api/models/user");
let server = require("../index.js");

let threadID, token;

const validUser = {
  name: "validUser",
  email: "validUser@test.com",
  password: "validUser"
};

beforeAll(async () => {
  const userData = await populateUsers(validUser);
  token = userData.token;
  const { forumId } = await populateForum();
  const { threadId } = await populateThread(forumId, userData.authorId);
  await populatePost(userData.authorId, threadId);
  threadID = threadId;
});

afterAll(() => {
  server.close();
});

describe("api/posts", () => {
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
});
