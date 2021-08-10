const { JSDOM } = require("jsdom");

module.exports = function(body, config) {
  const asciidoctor = require("asciidoctor")();
  const content = asciidoctor.convert(body, {
    attributes: { showtitle: true }
  });
  const dom = new JSDOM(content);

  const steps = [];

  const sections = dom.window.document.querySelectorAll(".sect1");

  for (let i = 0; i < sections.length; i++) {
    const titleElement = sections[i].querySelector("h2");
    if(!titleElement){
      console.error("Make sure each section of your codelab have a dedicated title");
    }
    const title = titleElement.innerHTML;
    const body = sections[i].querySelector(".sectionbody").innerHTML;
    steps.push(`
        <google-codelab-step label="${title}" duration="0">
        ${body}
        </google-codelab-step>
        `);
  }

  const mainTitle = dom.window.document.querySelector("h1");
  if(!mainTitle){
    console.error("Make sure that your codelab have a level 1 heading");
  }

  return (data = {
    ...config,
    content: steps.join("\n"),
    title: mainTitle.innerHTML
  });
};
