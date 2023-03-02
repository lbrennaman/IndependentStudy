function Editor(properties) {
    return(
        <div id={"EditorContainer"} className={"container-fluid p-0 m-0"} style={{height: '100%', width: '100%'}}>
            {properties.editorLines}
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