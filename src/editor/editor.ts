import { EditorView, ViewUpdate } from "@codemirror/view"
import { EditorState, TransactionSpec } from "@codemirror/state"
import limeCodeMirrorSetup from "./codemirror-setup"


/**
 * This class represents the rich text editor of the lime-editor element. It
 * links the editor to a textarea, and handle things like configuration, toolbar
 * elements, etc.
 */
export class LimeEditor {
  /**
   * The underlying CodeMirror editor view.
   */
  private readonly _view: EditorView

  /**
   * The associated textarea element.
   */
  readonly textarea: HTMLTextAreaElement

  /**
   * We update the accessor for the textarea's value property, so the editor
   * is refreshed when the textarea content is modified programmatically.
   * When we need to update the content of the textarea because the CM editor
   * changed, we keep a direct reference to the native property, to avoid
   * infinite loops.
   */
  private readonly _textareaValueProperty: PropertyDescriptor

  /**
   * Creates a new Lime Markdown editor.
   *
   * @param textarea The associated textarea. Its content will be kept in sync.
   * @param parent The parent element of the CodeMirror editor.
   * @param root The document root. You must specify this if the editor is built
   *             inside a shadow DOM.
   */
  constructor(textarea: HTMLTextAreaElement, parent: Element | undefined, root:  Document | ShadowRoot | undefined) {
    this.textarea = textarea

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore: TS doesn't seems to know __proto__ exists.
    this._textareaValueProperty = Object.getOwnPropertyDescriptor(this.textarea.__proto__, "value")!

    this._view = new EditorView({
      state: EditorState.create({
        doc: this.textarea.value,
        extensions: [
          limeCodeMirrorSetup,
          EditorView.updateListener.of((v: ViewUpdate) => {
            if (v.docChanged && this._textareaValueProperty.set) {
              this.setTextareaValue(v.view.state.doc.toString())
            }
          })
        ]
      }),
      parent,
      root
    })

    this.setupTextareaSync()
  }

  /**
   * Commits all transactions into the editor view.
   *
   * @param specs The transactions to commit.
   * @private
   */
  private commit(...specs: TransactionSpec[]) {
    this._view.update(specs.map(spec => this._view.state.update(spec)))
  }

  /**
   * Directly sets the content of the underlying textarea, without
   * triggering CM update.
   *
   * @param val The new value.
   * @private
   */
  private setTextareaValue(val: string) {
    if (this._textareaValueProperty.set) {
      this._textareaValueProperty.set.apply(this.textarea, [val])
    }
  }

  private setupTextareaSync() {
    const syncTextareaToEditor = () => {
      this.commit({
        changes: {
          from: 0,
          to: this._view.state.doc.length,
          insert: this.textarea.value
        }
      })
    }

    this.textarea.addEventListener('input', syncTextareaToEditor)
    this.textarea.addEventListener('change', syncTextareaToEditor)

    // We patch the textarea element so if its `value` property is updated,
    // we can update the CM editor.
    Object.defineProperty(this.textarea, "value", {
      configurable: true,
      enumerable: true,
      get: () => {
        if (this._textareaValueProperty.get) {
          return this._textareaValueProperty.get.apply(this.textarea)
        } else {
          return this._view.state.doc.toString()
        }
      },
      set: (val: string) => {
        this.setTextareaValue(val)
        syncTextareaToEditor()
      }
    })
  }

  /**
   * The underlying CodeMirror view (readonly).
   */
  get cm() {
    return this._view
  }

  /**
   * The text content of the editor.
   */
  get value() {
    return this.textarea.value
  }

  /**
   * Updates the text content of the editor.
   *
   * @param val The new content.
   */
  set value(val) {
    this.commit({
      changes: {
        from: 0,
        to: this._view.state.doc.length,
        insert: val
      }
    })
  }
}
