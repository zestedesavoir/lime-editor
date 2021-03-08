import {LimeEditor} from '../lime-editor.js'
import {fixture, html} from '@open-wc/testing'

const assert = chai.assert

suite('lime-editor', () => {
  test('is defined', () => {
    const el = document.createElement('lime-editor')
    assert.instanceOf(el, LimeEditor)
  })

  test('renders with default values', async () => {
    const el = await fixture(html`<lime-editor></lime-editor>`)
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    )
  })

  test('renders with a set name', async () => {
    const el = await fixture(html`<lime-editor name="Test"></lime-editor>`)
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, Test!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    )
  })

  test('handles a click', async () => {
    const el = (await fixture(html`<lime-editor></lime-editor>`)) as LimeEditor
    const button = el.shadowRoot!.querySelector('button')!
    button.click()
    await el.updateComplete
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 1</button>
      <slot></slot>
    `
    )
  })
})
