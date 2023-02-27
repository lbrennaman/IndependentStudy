import React from 'react';
import LinkedList from './LinkedList';
import Block from './Block';
import { op_list } from './DragZone';

export class BlockZone extends React.Component {
    constructor(properties) {
        super(properties);
        this.state = {
            lines: new LinkedList([<Block/>]),
        }

        // Default BlockZone Function Bindings
        //this.allowDrop = this.allowDrop.bind(this);
        //this.handleKeyDown = this.handleKeyDown.bind(this);
        //this.handleDrop = this.handleDrop.bind(this);
    }

    /*
    allowDrop(event) {
        event.preventDefault();
        event.stopPropagation();

        console.log("Drop allowed!");
        if (event.target.id === (<UserInput/>).type) {
            console.log("Allowdrop: " + event.target);
        } else {
            console.log("Allowdrop: " + event.target);
        }
    }

    handleDrop(event, lineNumber) {
        console.log("Object drop: ", event.target);
        console.log("Data: " + op_list);
        console.log(lineNumber);
        
        // this.state.lines.replace(index, <Block>);
        event.stopPropagation();
    }
*/
    render() {
        var elements = [];
        var index = 0;

        // Iterate through each element in LinkedList 
        while (this.state.lines.getValue(index)) {
            // For each element, push (to elements) the following jsx structure:
            elements.push(
                <div className="row p-0 m-0" key={"container" + index} style={{height: '100%', width: '100%', border: '2px solid black'}}>
                    <div className="col-1 p-0 m-0" style={{height: '100%'}}>
                        {index + 1}
                    </div>
                    <div className="col p-0 m-0" 
                        style={{height: '100%'}}>
                            <Block/>
                    </div>
                </div>
            )
            index++;
        }

        return(
            <div id={"BlockZoneContainer"} className="container-fluid p-0 m-0" style={{height: '100%'}}>
                {elements}
            </div>
        )
    }
}

export default BlockZone;