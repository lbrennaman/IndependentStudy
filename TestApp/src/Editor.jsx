function Editor(properties) {
    return(
        <div id={"EditorContainer"} className={"container-fluid p-0 m-0"} style={{height: '100%', width: '100%'}}>
            {properties.fileTable}
        </div>
    );
}

export class EditorController {
    constructor() {
        this.fileTable = [<div className={"container-fluid p-0 m-0"} style={{height: '30px', width: '100%', border: '2px solid yellow'}}>{"Simulated line"}</div>]
        this.component = <Editor fileTable={this.fileTable}/>
    }

    getComponent() {
        return this.component;
    }

}

export default EditorController;