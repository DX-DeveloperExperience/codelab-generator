module.exports = function(input, target) {
  const asciidoctor = require("asciidoctor")();
  const fs = require("fs");
  const Mustache = require("mustache");
  const { JSDOM } = require("jsdom");
  const path = require("path");

  const body = fs.readFileSync(input);
  const content = asciidoctor.convert(body, {
    attributes: { showtitle: true }
  });
  const dom = new JSDOM(content);
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

  const template = fs.readFileSync(
    path.resolve(__dirname, "./template.html"),
    "utf8"
  );

  const html = Mustache.render(template, {
    content: steps.join("\n"),
    title: dom.window.document.querySelector("h1").innerHTML
  });

  const rimraf = require("rimraf");

  const utils = require("util");
  const rimraf$ = utils.promisify(rimraf);
  const mkdir$ = utils.promisify(fs.mkdir);
  const git$ = require("simple-git/promise");

  const p = fs.existsSync(target)
    ? Promise.resolve()
    : rimraf$(target)
        .then(() => {
          return mkdir$(target);
        })
        .then(() => {
          console.log("downloading template");
          return git$()
            .silent(true)
            .clone(
              "https://github.com/DX-DeveloperExperience/adoc-codelab-template",
              target
            );
        });

  p.then(() => {
    return fs.writeFileSync(target + "/index.html", html);
  }).catch(err => console.error(err));
};
