function BlockZone(properties) {
    var array = [];
    for (var i = 0; i < properties.blockTable.length; i++) {
        array.push(properties.blockTable[i].getComponent())
    }
    return(
        <div id={"BlockZone"} className={"container-fluid p-0 m-0"} style={{height: '100%', width: '100%'}}>
            {array}
        </div>
    );
}

export class BlockZoneController {
    constructor(settings = {}) {
        this.component = <BlockZone 
            blockTable={settings.blockTable}
            updateSelected={settings.updateSelected}
            updateInput={settings.updateInput}/>;
    }

    getComponent() {
        return this.component;
    }
}

export default BlockZoneController;