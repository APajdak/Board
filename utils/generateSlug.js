module.exports = function(str) {
  str = str.replace(/ /g, "-").toLowerCase();
  const randomCode = (Math.floor(Math.random() * 100000) + 100000)
    .toString()
    .substring(1);
  return `${randomCode}-${str}`;
};
