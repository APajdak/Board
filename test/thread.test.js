const { populateForum } = require("./config/populateForum");
const { populateThread } = require("./config/populateThread");
const { populateUsers } = require("./config/populateUsers");
const expect = require("expect");
const request = require("supertest");
const server = require("../index.js");

let forumID, token;

describe("/api/threads", () => {
  before(async () => {
    const userData = await populateUsers();
    const { forumId } = await populateForum();
    await populateThread(forumId, userData.authorId);
    token = userData.token;
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
});
