function BlockZone(properties) {
    return(
        <div id={"BlockZone"} className={"container-fluid p-0 m-0"} style={{height: '100%', width: '100%'}}>
            {/* To add line numbers: 
                1) separate BlockZone into left and right columns
                2) left column is line numbers (list of divs from 1 to blockTable.length)
                3) right column is properties.blockTable.getComponent() */}
            {properties.blockTable.getBlockTableComponent()}
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