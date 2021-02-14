#!/usr/bin/env node

const path = require("path");
const [, , ...args] = process.argv;
let config = {};

if (args.length < 2) {
  console.error(
    "You should define a minimum of two arguments to this command line"
  );
  process.exit();
}

if (args.length === 3) {
  const configPath = path.resolve(process.cwd(), args[2]);

  try {
    config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

const input = path.resolve(process.cwd(), args[0]);
const output = path.resolve(process.cwd(), args[1]);

require("./index")(input, output, config);
