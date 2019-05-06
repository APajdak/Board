const expect = require("expect");

const isEmpty = require("../api/validation/isEmpty");
const isString = require("../api/validation/isString");
const isValidEmail = require("../api/validation/isValidEmail");
const hasProperLength = require("../api/validation/hasProperLength");

describe("Validation tests", () => {
  describe("isEmpty", () => {
    it("should return true when falsy or empty data was passed", () => {
      expect(isEmpty("")).toBeTruthy();
      expect(isEmpty({})).toBeTruthy();
      expect(isEmpty([])).toBeTruthy();
      expect(isEmpty(null)).toBeTruthy();
      expect(isEmpty(undefined)).toBeTruthy();
    });
    it("should return false when truthy or unempty data was passed", () => {
      expect(isEmpty("test")).toBeFalsy();
      expect(isEmpty({ 1: 2 })).toBeFalsy();
      expect(isEmpty([1])).toBeFalsy();
      expect(isEmpty(true)).toBeFalsy();
    });
  });
  describe("isString", () => {
    it("should return true when string was passed", () => {
      expect(isString("string")).toBeTruthy();
    });
    it("should return false when anything but string was passed", () => {
      expect(isString({})).toBeFalsy();
      expect(isString(1)).toBeFalsy();
      expect(isString([2])).toBeFalsy();
      expect(isString(false)).toBeFalsy();
      expect(isString(undefined)).toBeFalsy();
    });
  });
  describe("isValidEmail", () => {
    it("should return true when valid email was passed", () => {
      expect(isValidEmail("testing@validation.com")).toBeTruthy();
      expect(isValidEmail("t.e.s.t.i.n.g@valid.com")).toBeTruthy();
      expect(isValidEmail("t-e-s-t--.n.g@valid.com")).toBeTruthy();
    });
    it("should return false when invalid email was passed", () => {
      expect(isValidEmail("testingvalidation.com")).toBeFalsy();
      expect(isValidEmail("testing@validation")).toBeFalsy();
      expect(isValidEmail("testing@v.a")).toBeFalsy();
    });
  });
  describe("hasProperLength", () => {
    it("should return true when string has proper length", () => {
      expect(hasProperLength("testing", 2, 10)).toBeTruthy();
      expect(hasProperLength("te", 2, 2)).toBeTruthy();
      expect(hasProperLength("te", 1, 3)).toBeTruthy();
    });
    it("should return false when string has improper length", () => {
      expect(hasProperLength("test", 7, 10)).toBeFalsy();
      expect(hasProperLength("test", 1, 3)).toBeFalsy();
    });
  });
});
