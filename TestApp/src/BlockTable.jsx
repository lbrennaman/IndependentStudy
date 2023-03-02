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

export function BlockTableController(properties) {
    const [blockComponent, updateBlockComponent] = useState(<BlockTable blockTable={blockTable}/>);
    const [editorComponent, updateEditorComponent] = useState(<EditorComponent)
    constructor(settings = {}) {
        this.blockTable = [new BlockController()];
        this.blockTableComponent = <BlockTable blockTable={this.blockTable}/>
        this.editorLinesComponent = <EditorLines blockTable={this.blockTable}/>
    }

    getBlockTableComponent() {
        return this.blockTableComponent;
    }

    getEditorLinesComponent() {
        return this.editorLinesComponent;
    }
}

export default BlockTableController;