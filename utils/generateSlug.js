class Slug {
  constructor() {
    this.slugs = new Set();
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
}

module.exports = Slug;
