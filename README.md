# Lime Markdown Editor 

Lime Editor is a web-based Markdown editor for Zeste de Savoir or any other project, built using TypeScript and
LitElement.

**This project is in very early stage and is far from working today.**

### Objectives of this project

We aim to build an efficient Markdown editor for Zeste de Savoir, where huge contents are being written. [Some concepts
were written in French in this pull-request](https://github.com/zestedesavoir/zds-site/pull/5910).

## Setup

Install dependencies and build code in watch mode:

```bash
npm i
npm run build:watch
```

As for now, in another terminal, run:

```bash
npm run serve
```

then go to `http://127.0.0.1:8000/dev`.

## Testing

This sample uses Karma, Chai, Mocha, and the open-wc test helpers for testing. See the
[open-wc testing documentation](https://open-wc.org/testing/testing.html) for more information.

Tests can be run with the `test` script:

```bash
npm test
```

## Linting

To lint the project run:

```bash
npm run lint
```

## Documentation & demo

This project includes a simple website generated with the [eleventy](11ty.dev) static site generator and the templates
and pages in `/docs-src`. The site is generated to `/docs`.

```bash
npm run docs
```

To serve the site locally, run:

```bash
npm run docs:serve
```

To watch the site files, and re-build automatically, run:

```bash
npm run docs:watch
```

The site will usually be served at `http://127.0.0.1:8000`.
