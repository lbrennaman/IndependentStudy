function Editor(properties) {
    var array = [];
    for (var i = 0; i < properties.editorLines.length; i++) {
        array.push(properties.editorLines[i])
    }
    return(
        <div id={"EditorContainer"} className={"container-fluid p-0 m-0"} style={{height: '100%', width: '100%'}}>
            {array}
        </div>
    );
}

export class EditorController {
    constructor(settings = {}) {
        this.component = <Editor editorLines={settings.editorLines} updateEditorLines={settings.updateEditorLines}/>
    }

    getComponent() {
        return this.component;
    }

}

export default EditorController;