import React from 'react';
import ReactDOM from 'react-dom/client';
import Block from './Block';
import BlockZone from './BlockZone';
import DragZone from './DragZone';
import * as monaco from 'monaco-editor';


// #######################################################################################
// 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
// #######################################################################################

// # 1: Initialize all ReactDOM objects #

ReactDOM.createRoot(document.getElementById("DragZone")).render(
    <React.StrictMode>
        <DragZone/>
    </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("BlockZone")).render(
    <React.StrictMode>
        <BlockZone/>
    </React.StrictMode>
);

// #######################################################################################
// 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
// #######################################################################################

// # 2: List all function definitions #

// #######################################################################################
// 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
// #######################################################################################

// # 3: Define any action listeners for document #

// #######################################################################################
// 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4
// #######################################################################################

// # 4: Actual Main: list all sequential statements here #

// Initialize Monaco editor
const editor = monaco.editor.create(document.getElementById('MonacoEditorContainer'), {
  value: [''].join('\n'),
  language: 'cpp',
  theme: 'vs-dark'
});

var model = editor.getModel();