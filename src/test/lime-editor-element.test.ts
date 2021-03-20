import {fixture, html} from '@open-wc/testing'

import {LimeEditorElement} from '../lime-editor-element.js'

mocha.setup('tdd')

const assert = chai.assert
chai.should()

suite('lime-editor', () => {
  it('is defined', () => {
    const el = document.createElement('lime-editor')
    el.should.be.an.instanceOf(LimeEditorElement)
  })

  it('loads code mirror', async () => {
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

  it('renders with a set name', async () => {
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

  it('handles a click', async () => {
    // const el = (await fixture(html`<lime-editor></lime-editor>`)) as LimeEditorElement
    // const button = el.shadowRoot!.querySelector('button')!
    // button.click()
    // await el.updateComplete
    // assert.shadowDom.equal(
    //   el,
    //   `
    //   <h1>Hello, World!</h1>
    //   <button part="button">Click Count: 1</button>
    //   <slot></slot>
    // `
    // )
  })
})
