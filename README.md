# Codelab Generator 🎉

📦 This project give the possibility to generate a Google codelab with asciidoc or markdown files.

You can use this module directly from the command line or from your code !

## How to use ?

### Command line

```shell
npx @dxdeveloperexperience/codelab-generator ./index.adoc ./target

npx @dxdeveloperexperience/codelab-generator ./index.md ./target
```

### In your code

```js
const codelab = require("@dxdeveloperexperience/codelab-generator");

// ...
await codelab(labTmpFile, labsOutputDir);
```

## Configuration

### Values

| Name | Values | Description                                   |
| ---- | ------ | --------------------------------------------- |
| base | ""     | The base url of bower_components and elements |

### Examples

From shell
```shell
npx @dxdeveloperexperience/codelab-generator ./index.adoc ./target path/to/config.json

npx @dxdeveloperexperience/codelab-generator ./index.md ./target path/to/config.json
```

the config.json

```json
{
  "base": "baseurl/test/"
}
```

or

```js
const codelab = require("@dxdeveloperexperience/codelab-generator");

// ...
await codelab(labTmpFile, labsOutputDir, { base: "" });
```

Result, it will convert template
from:

```html
<script src="{{ &base }}bower_components/webcomponentsjs/webcomponents-lite.js"></script>
<link rel="import" href="{{ &base }}elements/codelab.html" />
```

to:

```html
<script src="baseurl/test/bower_components/webcomponentsjs/webcomponents-lite.js"></script>
<link rel="import" href="baseurl/test/elements/codelab.html" />
```

## Contributors

- Emmanuel DEMEY
- Aurélien LOYER
