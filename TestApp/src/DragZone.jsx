import { useState } from 'react';

export function DragZone(properties) {
    var blocks = [];
    for (var i = 0; i < properties.blockList.length; i++) {
        blocks.push(properties.blockList[i]);
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
                    {blocks}
                </div>
            </div>
        </div>
    );
}

export default DragZone;