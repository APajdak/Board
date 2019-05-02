const GenerateSlug = require("../utils/generateSlug");
const expect = require("expect");
const slug = new GenerateSlug();

const slugs = [
  "test slugs1",
  "test slugs2",
  "test slugs3",
  "test slugs4",
  "test slugs5",
  "test slugs6",
  "test slugs7",
  "test slugs8",
  "test slugs9",
  "test slugs10"
];

describe("Generate slug", () => {
  it("should add slugs", () => {
    for (let string of slugs) {
      slug.addSlug(string);
    }
    expect(slug.slugs.size).toBe(10);
  });

  it("should return a slug", () => {
    const userSlug = slug.addSlug("New user");
    expect(userSlug.length).toBe("New user".length + 6);
  });
});
