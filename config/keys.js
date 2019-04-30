switch (process.env.NODE_ENV) {
  case "test":
    module.exports = require("./test");
    break;

  default:
    module.exports = require("./dev");
    break;
}
