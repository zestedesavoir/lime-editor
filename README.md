# Lime Markdown Editor 

Lime Editor is a web-based Markdown editor for Zeste de Savoir or any other project, built using TypeScript and
LitElement.

**This project is in very early stage and is far from working today.**


## Objectives of this project

We aim to build an efficient Markdown editor for Zeste de Savoir, where huge contents are being written. [Some concepts
were written in French in this pull-request](https://github.com/zestedesavoir/zds-site/pull/5910).


## How to use

_Too early; please come back later._


## How to contribute

This project is governed by [Zeste de Savoir's Code of Conduct](https://github.com/zestedesavoir/zds-site/blob/dev/CODE_OF_CONDUCT.md).

### Setup

Install dependencies and run `dev` to build code in watch mode and serve files on a local webserver.

```bash
npm i
npm run dev
```

Then, go to `http://127.0.0.1:8000/demo`.

### Testing

This sample uses Karma, Chai, Mocha, and the open-wc test helpers for testing. See the
[open-wc testing documentation](https://open-wc.org/docs/testing/testing-package/) for more information.

Tests can be run with the `test` script:

```bash
npm test
```

### Linting

To lint the project run:

```bash
npm run lint

# or, to auto-fix if possible
npm run lint:fix
```

### Documentation

This project includes a simple website generated with the [eleventy](11ty.dev) static site generator and the templates
and pages in `/docs-src`. The site is generated to `/docs`.

```bash
npm run docs
```

To work on the documentation locally in watch mode, run:

```bash
npm run docs:dev
```

The site will usually be served at `http://127.0.0.1:8000` (or 8001 if the port is already used).
