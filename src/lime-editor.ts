import {LitElement, html, customElement, property, css} from 'lit-element'

import { EditorView, ViewUpdate } from "@codemirror/view"
import {EditorState} from "@codemirror/state"

import limeCodeMirrorSetup from "./codemirror-setup"


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
    
    .lime-editor-wrapper {
      position: relative;
    }
    
    .lime-editor-original-textarea {
      display: none;
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

  /**
   * The underlying textarea, part of the form. CodeMirror content is synced with this textarea so
   * the form get the correct content at the end.
   * @private
   */
  private nativeTextarea: HTMLTextAreaElement | null = null

  /**
   * The CodeMirror view, to control the rich editor.
   * @private
   */
  private codeMirrorView: EditorView | null = null

  firstUpdated() {
    const slot = this.shadowRoot?.querySelector('slot')
    if (slot) {
      this.nativeTextarea = slot
        .assignedElements({flatten: true})
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
          limeCodeMirrorSetup,
          EditorView.updateListener.of((v: ViewUpdate) => {
            if (v.docChanged) {
              this.nativeTextarea!.value = v.view.state.doc.toString()
            }
          })
        ]
      }),
      parent: this.shadowRoot?.querySelector('.lime-editor-wrapper .lime-editor-cm-root')!,
      root: this.shadowRoot!
    })

    this.nativeTextarea.addEventListener('input', () => {
      const transaction = this.codeMirrorView?.state.update({
        changes: {
          from: 0,
          to: this.codeMirrorView?.state.doc.length,
          insert: this.nativeTextarea?.value
        }
      })
      if (transaction) {
        this.codeMirrorView?.update([transaction])
      }
    })
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
