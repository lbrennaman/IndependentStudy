import BlockController from './Block';
import BlockZoneController from './BlockZone';
import EditorController from './Editor';

function Workspace(properties) {

}

export class WorkspaceController {
    constructor(settings = {}) {
        this.blockList = [new BlockController()];
        this.editorLines = this.setEditorLines();

        // Even if the Workspace Component is created, it will not update upon
        // Updating editorLines like what would happen if this class were a component
    }

    setEditorLines() {
        var lines = [];
        for (var i = 0; i < blockList.length; i++) {
            lines.push(blockList[i].getValue());
        }
    }

    getBlockZone() {

    }

    getEditor() {

    }
}

export default WorkspaceController;