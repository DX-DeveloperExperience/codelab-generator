const { JSDOM } = require("jsdom");

module.exports = function (body, config) {
  const showdown = require("showdown"),
    converter = new showdown.Converter();
  const content = converter.makeHtml(body.toString());
  const dom = new JSDOM(content);
  const steps = [];

  const childNodes = dom.window.document.body.childNodes;

  let partial = "";
  for (let i = 0; i < childNodes.length; i++) {
    if (!childNodes[i].tagName || childNodes[i].tagName === "H1") {
      continue;
    }
    if (childNodes[i].tagName === "H2") {
      if (partial !== "") {
        partial += "</google-codelab-step>";
        steps.push(partial);
        partial = "";
      }
      partial = `<google-codelab-step label="${childNodes[i].innerHTML}" duration="0">`;
    } else {
      partial += childNodes[i].outerHTML;
    }
  }
  if (partial !== "") {
    partial += "</google-codelab-step>";
    steps.push(partial);
  }

  return {
    ...config,
    content: steps.join("\n"),
    title: dom.window.document.querySelector("h1").innerHTML,
  };
};
