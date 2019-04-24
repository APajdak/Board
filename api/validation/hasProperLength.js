module.exports = (str, min, max) => {
  if (str.length < min || str.length > max) {
    return false;
  } else {
    return true;
  }
};
