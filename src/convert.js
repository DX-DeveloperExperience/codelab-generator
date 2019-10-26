module.exports = function(dom) {
  let steps = [];

  const sections = dom.window.document.querySelectorAll(".sect1");

  for (let i = 0; i < sections.length; i++) {
    const title = sections[i].querySelector("h2").innerHTML;
    const body = sections[i].querySelector(".sectionbody").innerHTML;
    steps.push(`
      <google-codelab-step label="${title}" duration="0">
      ${body}
      </google-codelab-step>
      `);
  }

  return {
    content: steps.join("\n"),
    title: dom.window.document.querySelector("h1").innerHTML
  };
};
