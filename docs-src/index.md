---
layout: page.11ty.cjs
title: <lime-editor> ⌲ Home
---

# &lt;lime-editor>

`<lime-editor>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<lime-editor>` is just an HTML element. You can it anywhere you can use HTML!

```html
<lime-editor></lime-editor>
```

  </div>
  <div>

<lime-editor></lime-editor>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<lime-editor>` can be configured with attributed in plain HTML.

```html
<lime-editor name="HTML"></lime-editor>
```

  </div>
  <div>

<lime-editor name="HTML"></lime-editor>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<lime-editor>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name="lit-html";

render(html`
  <h2>This is a &lt;lime-editor&gt;</h2>
  <lime-editor .name=${name}></lime-editor>
`, document.body);
```

  </div>
  <div>

<h2>This is a &lt;lime-editor&gt;</h2>
<lime-editor name="lit-html"></lime-editor>

  </div>
</section>
