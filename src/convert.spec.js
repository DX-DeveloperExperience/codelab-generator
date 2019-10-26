const { JSDOM } = require("jsdom");
const convert = require("./convert");

describe("convert", () => {
  it("should return the main title", () => {
    const html = `
        <h1>Codelab</h1>`;
    const dom = new JSDOM(html);

    expect(convert(dom).title).toBe("Codelab");
  });
});
