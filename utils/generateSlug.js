class Slug {
  constructor() {
    this.slugs = new Set();
    this.getSlugsFromDB();
  }

  addSlug(str) {
    const newSlug = this.generateSlug(str);
    if (this.slugs.has(newSlug)) {
      return this.addSlug(str);
    }
    this.slugs.add(newSlug);
    return newSlug;
  }

  generateSlug(str) {
    str = str.replace(/ /g, "-").toLowerCase();
    const randomCode = (Math.floor(Math.random() * 100000) + 100000)
      .toString()
      .substring(1);
    return `${randomCode}-${str}`;
  }

  async getSlugsFromDB() {
    const { Forum } = require("../api/models/forum");
    const { Thread } = require("../api/models/thread");
    const { User } = require("../api/models/user");

    const slugsFromDB = [];

    slugsFromDB.push(await Forum.find({}).select("slug -_id"));
    slugsFromDB.push(await Thread.find({}).select("slug -_id"));
    slugsFromDB.push(await User.find({}).select("slug -_id"));

    for (let key in slugsFromDB) {
      for (let innerKey in slugsFromDB[key]) {
        this.slugs.add(slugsFromDB[key][innerKey].slug);
      }
    }
  }
}

module.exports = Slug;
