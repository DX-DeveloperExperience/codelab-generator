module.exports = function(input) {
  const fs = require("fs");
  const path = require("path");
  const Mustache = require("mustache");

  const template = fs.readFileSync(
    path.resolve(__dirname, "./template.html"),
    "utf8"
  );

  const body = fs.readFileSync(input);

  const convert = input.endsWith(".adoc")
    ? require("./converter/adoc")
    : require("./converter/markdown");
  return Mustache.render(template, convert(body));
};
