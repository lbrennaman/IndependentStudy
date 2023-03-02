import React from 'react';
import ReactDOM from 'react-dom/client';
import Block from './Block';
import SetRootLine from './BlockZone';
import SetRootDragZone from './DragZone';
import * as monaco from 'monaco-editor';
// import './index.css'

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------
// First: Initialize all state 0 objects

ReactDOM.createRoot(document.getElementById('rootLine')).render(
  <React.StrictMode>
    <SetRootLine id="root" name="rootLine"/>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("DragZone")).render(
  <React.StrictMode>
    <SetRootDragZone name="HELLO, WORLD!"/>
  </React.StrictMode>
);

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------
// Second: List all function definitions

function getEditorLine(lineNumber) {
    return model.getLineContent(lineNumber);
}

function createBlock() {
  const block = document.createElement("div");
  block.setAttribute("style", "border: 2px solid black");
  document.getElementById("BlockArea").appendChild(block)
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------
// Third: List all action listeners

// Test reading lines from code editor by pressing 0-9
document.addEventListener('keypress', (e) => {
  if (e.key.charCodeAt(0) > 47 && e.key.charCodeAt(0) < 58)
      console.log(getEditorLine(e.key.charCodeAt(0) - 48));
})

// Test writing to Monaco by pressing a
document.addEventListener('keypress', (e) => {
  if (e.key.charCodeAt(0) > 96 && e.key.charCodeAt(0) < 98)
  //stackoverflow.com/questions/38674092/microsoft-monaco-editor-in-browser-
  //-get-value-of-line
      model.pushEditOperations([], [{
          forceMoveMarkers: true,
          identifier: "change",
          range: {
              startLineNumber: 0,
              endLineNumber: 0,
              startColumn: 1,
              endColumn: 1,
          },
          text: "a"
      }], []);
})

// Test creating a block by pressing b
document.addEventListener('keypress', (e) => {
  if (e.key.charCodeAt(0) > 97 && e.key.charCodeAt(0) < 99)
      createBlock();
})

/*
// Prevent enter from generating a newline explicitly
document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
})
*/

// Method to add block to drag zone
// When a character is typed into current line, perform a search of existing blocks via keyword
// Provide a list of all possible blocks by rendering the blocks in the drag zone

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------
// Fourth: List all sequential (one time) statements here

const editor = monaco.editor.create(document.getElementById('MonacoEditorContainer'), {
  value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
  language: 'javascript',
  theme: 'vs-dark'
});

var model = editor.getModel();
