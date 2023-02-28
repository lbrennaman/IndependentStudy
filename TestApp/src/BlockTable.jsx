import BlockController from './Block';
import { useState } from 'react';

function BlockTable(properties) {
    var blockLines = [];
    for (var i = 0; i < properties.blockTable.length; i++) {
        blockLines.push(<div id={"BlockTable Line: " + i} className={"row p-0 m-0"} style={{height: '30px', width: '100%'}}>{properties.blockTable[i].getComponent()}</div>);
    }

    return(
        <div id={"BlockTable"} className={"container-fluid p-0 m-0"} style={{height: '100%', width: '100%'}}>
            {blockLines}
        </div>
    );
}

function EditorLines(properties) {
    var editorLines = [];
    for (var i = 0; i < properties.blockTable.length; i++) {
        editorLines.push(<div id={"Editor Line: " + i} className={"row p-0 m-0"} style={{height: '30px', width: '100%', border: '2px solid green'}}>{properties.blockTable[i].getValue()}</div>);
    }

    return(
        <div id={"EditorLines"} className={"container-fluid p-0 m-0"} style={{height: '100%', width: '100%'}}>
            {editorLines}
        </div>
    );
}

export class BlockTableController {
    constructor(settings = {}) {
        this.blockTable = [new BlockController()];
        this.blockTableComponent = <BlockTable blockTable={this.blockTable}/>
        this.editorLinesComponent = <EditorLines blockTable={this.blockTable}/>
    }
    
    setEditorLines() {
        var array = [];
        for (var i = 0; i < this.blockTable.length; i++) {
            array.push(<div className={"row p-0 m-0"} style={{height: '30px', width: '100%', border: '2px solid green'}}>{this.blockTable[i].getValue()}</div>);
        }
        return array;
    }

    getBlockTableComponent() {
        return this.blockTableComponent;
    }

    getEditorLinesComponent() {
        return this.editorLinesComponent;
    }
}

export default BlockTableController;