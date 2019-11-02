const adoc = require("./adoc");

describe("convert", () => {
  it("should return the main title", () => {
    expect(adoc(`= Codelab`).title).toBe("Codelab");
  });
});
