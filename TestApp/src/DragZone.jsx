import React from 'react';
import { UserInput, Block } from './Block';

export class DragZone extends React.Component {
    constructor(properties) {
        super(properties);
        this.state = {
            blockList: null
        };

        this.value = null;

        // Default DragZone Function Bindings
        this.setBlockList = this.setBlockList.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.getBlocks = this.getBlocks.bind(this);
    }

    // Parse the list of filters from the text in UserInput and return a filtered list of blocks
    setBlockList(event) {
        console.log("Blocklist updated");
        var text = event.target.value;
        var filters = parseFilters(text);
        this.state.blockList = filterBlocks(filters, text);

        event.stopPropagation();
    }

    handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
        console.log("Block key down: " + event.key);
        this.currentKey = event.key;
    }

    // Using the filtered list of all possible blocks, create a list of those block objects
    getBlocks() {
        return <div className="container-fluid p-0 m-0" style={{height: '30px'}}><Block/></div>
    }

    // Parse the list of filters from the line of text and return an array of filters
    parseFilters() {
        return null;
    }

    // Using the filters, return a list of all possible blocks that match the search criteria
    filterBlocks() {
        return null;
    }

    render() {
        return(
            <div className="container-fluid p-0 m-0" style={{height: '100%'}}>
                <div className="container-fluid p-0 m-0" style={{height: '30px'}}>
                    <UserInput onChange={(event) => this.setBlockList(event)} onKeyDown={(event) => this.handleKeyDown(event)}/>
                </div>
                <div className="container-fluid p-0 m-0" style={{height: '100%'}}>
                    {this.getBlocks()}
                </div>
            </div>
        )
    }
}

export default DragZone;