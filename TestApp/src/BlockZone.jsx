function BlockZone(properties) {
    return(
        <div id={"BlockZone"} className={"container-fluid p-0 m-0"} style={{height: '100%', width: '100%'}}>
            {properties.blockTable}
        </div>
    );
}

export class BlockZoneController {
    constructor() {
        this.blockTable = [<div className={"container-fluid p-0 m-0"} style={{height: '30px', width: '100%', border: '2px solid yellow'}}>{"Simulated line"}</div>]
        this.component = <BlockZone blockTable={this.blockTable}/>;
    }

    getComponent() {
        return this.component;
    }
}

export default BlockZoneController;