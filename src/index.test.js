const app = require("./index");
const mongoose = require("mongoose");
jest.mock("mongoose");

describe("app", () => {
  it("the app should be exported and a valid object", async () => {
    mongoose.connect.mockImplementation((url, opts, callback) => callback());
    expect(typeof app).toBe("function");
  });
});
