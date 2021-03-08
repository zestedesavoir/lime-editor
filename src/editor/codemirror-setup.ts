import {keymap, highlightSpecialChars, drawSelection} from "@codemirror/view"
import {EditorState, Prec} from "@codemirror/state"
import {indentOnInput} from "@codemirror/language"
import {history, historyKeymap} from "@codemirror/history"
import {defaultKeymap} from "@codemirror/commands"
import {searchKeymap, highlightSelectionMatches} from "@codemirror/search"
import {defaultHighlightStyle} from "@codemirror/highlight"

import {markdown} from "@codemirror/lang-markdown"

export default [
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
