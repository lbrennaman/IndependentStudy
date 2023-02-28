function DragZone(properties) {
    var array = [];
    for (var i = 0; i < properties.blockList.length; i++) {
        array.push(properties.blockList[i].getComponent())
    }
    return(
        <div id={"DragZone"} className={"container-fluid p-0 m-0"} style={{height: '100%', width: '100%'}}>
            <div id={"DragZoneSplitter"} className={"row p-0 m-0"} style={{height: '30px', width: '100%'}}>
                <div id={"DragZoneContainer"} className={"container-fluid p-0 m-0"} style={{height: '100%', width: '100%'}}>
                    <form id={"DragZoneForm"} className={"p-0 m-0"} style={{height: '100%', width:'100%'}}>
                        <textarea id={"DragZoneSearchBar"} className={"p-0 m-0"}
                            onInput={(event) => properties.updateSearch(event.target.value)}
                            style={{
                                height: '100%', 
                                width:'100%', 
                                overflow: 'hidden', 
                                resize: 'none', 
                                border: 'none', 
                                outline: 'none', 
                                boxShadow: 'none',
                                whiteSpace: 'pre',
                                overflowWrap: 'normal',
                                overflowX: 'auto'
                            }}>
                        </textarea>
                    </form>
                </div>
            </div>
            <div id={"DragZoneBlockListViewContainerRow"} className={"row p-0 m-0"} style={{height: '100%', width: '100%'}}>
                <div id={"DragZoneBlockListViewContainer"} className={"container-fluid p-0 m-0"} style={{height: '30px', width: '100%'}}>
                    {array}
                </div>
            </div>
        </div>
    );
}

export class DragZoneController {
    constructor(settings = {}) {
        this.component = <DragZone 
            blockList={settings.blockList} 
            updateSearch={settings.updateSearch} 
            updateBlockList={settings.updateBlockList}
            updateSelected={settings.updateSelected}
            updateInput={settings.updateInput}/>
    }

    getComponent() {
        return this.component;
    }
}

export default DragZoneController;