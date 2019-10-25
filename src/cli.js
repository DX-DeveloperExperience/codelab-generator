#!/usr/bin/env node

const [, , ...args] = process.argv;

if (args.length !== 2) {
  console.error("You should define two arguments to this command line");
  process.exit();
}

const path = require("path");
const input = path.resolve(process.cwd(), args[0]);
const output = path.resolve(process.cwd(), args[1]);

require("./index")(input, output);
