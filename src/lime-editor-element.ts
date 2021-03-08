import {LitElement, html, customElement, property, css} from 'lit-element'
import { LimeEditor } from "./editor/editor"


/**
 * The lime-editor element.
 *
 * @slot - This element's only slow must contain a textarea.
 */
@customElement('lime-editor')
export class LimeEditorElement extends LitElement {
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
   * The CodeMirror view, to control the rich editor.
   * @private
   */
  private _editor: LimeEditor | null = null

  firstUpdated() {
    const slot = this.shadowRoot?.querySelector('slot')
    let textarea = null
    if (slot) {
      textarea = slot
        .assignedElements({flatten: true})
        .filter((node) => node.nodeName == 'TEXTAREA')[0] as HTMLTextAreaElement
    }

    if (!textarea) {
      console.error("lime-element requires a textarea as its only child.")
      return
    }

    this._editor = new LimeEditor(
      textarea,
      this.shadowRoot?.querySelector('.lime-editor-wrapper .lime-editor-cm-root')!,
      this.shadowRoot!
    )
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

  /**
   * Exposes the underlying Lime Markdown editor.
   */
  get editor() {
    return this._editor
  }

  /**
   * The editor's content.
   */
  get value() {
    return this._editor ? this._editor.textarea.value : ""
  }

  /**
   * Updates the editor's content.
   * @param val
   */
  set value(val) {
    if (this._editor) {
      this._editor.value = val
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lime-editor': LimeEditorElement;
  }
}
