module.exports = function (input, target, config) {
  const fs = require("fs");

  const html = require("./convert")(input, config);

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
          return git$()
            .silent(true)
            .clone(
              "https://github.com/DX-DeveloperExperience/adoc-codelab-template",
              target
            );
        });

  p.then(() => {
    return fs.writeFileSync(target + "/index.html", html);
  }).catch((err) => console.error(err));
  return p;
};
