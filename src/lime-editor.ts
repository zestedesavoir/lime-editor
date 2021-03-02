/**
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import {LitElement, html, customElement, property, css} from 'lit-element'

import {EditorView, keymap, highlightSpecialChars, drawSelection} from "@codemirror/view"
import {EditorState, Prec} from "@codemirror/state"
import {indentOnInput} from "@codemirror/language"
import {history, historyKeymap} from "@codemirror/history"
import {defaultKeymap} from "@codemirror/commands"
import {searchKeymap, highlightSelectionMatches} from "@codemirror/search"
import {defaultHighlightStyle} from "@codemirror/highlight"

import {markdown} from "@codemirror/lang-markdown"


/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('lime-editor')
export class LimeEditor extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px 0;
      max-width: 800px;
    }
  `

  /**
   * The URL to query for HTML previews. Lime Editor will send POST queries to it.
   */
  @property({type: String, attribute: "preview-api"})
  previewApi = null

  /**
   * A key used to store auto-saved text in the local storage, for users to avoid loosing their work
   * in case of browser crash.
   */
  @property({type: String, attribute: "autosave-key"})
  autosaveKey = null

  private nativeTextarea: HTMLTextAreaElement | null = null
  private codeMirrorView: EditorView | null = null;

  firstUpdated() {
    const slot = this.shadowRoot?.querySelector('slot')
    if (slot) {
      this.nativeTextarea = slot.assignedElements({flatten: true})
            .filter((node) => node.nodeName == 'TEXTAREA')[0] as HTMLTextAreaElement
    }

    if (!this.nativeTextarea) {
      console.error("lime-element requires a textarea as its only child.")
      return
    }

    this.codeMirrorView = new EditorView({
      state: EditorState.create({
        doc: this.nativeTextarea.value,
        extensions: [
          highlightSpecialChars(),
          history(),
          drawSelection(),
          EditorState.allowMultipleSelections.of(true),
          indentOnInput(),
          Prec.fallback(defaultHighlightStyle),
          highlightSelectionMatches(),
          keymap.of([
            ...defaultKeymap,
            ...searchKeymap,
            ...historyKeymap
          ]),
          markdown()
        ]
      }),
      parent: this.shadowRoot?.querySelector('.lime-editor-wrapper .lime-editor-cm-root') || undefined,
      root: this.shadowRoot || undefined
    })

    console.log(this.codeMirrorView)
  }

  render() {
    return html`
      <div class="lime-editor-wrapper">
        <div class="lime-editor-cm-root"></div>
        <div class="lime-editor-original-textarea">
          <slot></slot>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lime-editor': LimeEditor;
  }
}
