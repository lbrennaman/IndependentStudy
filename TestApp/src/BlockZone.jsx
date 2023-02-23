import React from 'react';
import LinkedList from './LinkedList';
import { UserInput } from './Block';
import { op_list } from './DragZone';

export class BlockZone extends React.Component {
    constructor(properties) {
        super(properties);
        this.state = {
            lines: new LinkedList([<UserInput value={""} onKeyDown={(event) => this.handleKeyDown(event, 1)}/>]),
        }

        // Default BlockZone Function Bindings
        this.allowDrop = this.allowDrop.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

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

    handleKeyDown(event, lineNumber) {
        if (event.key === 'Enter') {
            event.preventDefault();
            
            // Since this.state.lines cannot be directly modified, create a copy to modify, then use this.setState
            var copy = this.state.lines;
            copy.insert(lineNumber, <UserInput onKeyDown={(event) => this.handleKeyDown(event, lineNumber + 1)}/>);
            this.setState({lines: copy});
        }
    }

    handleDrop(event, lineNumber) {
        console.log("Object drop: ", event.target);
        console.log("Data: " + op_list);
        console.log(lineNumber);

        // Replace LinkedList[lineNumber] with <UserInput left=op_list[0] right=op_list[1]/>
        
        // this.state.lines.replace(index, <Block>);
        event.stopPropagation();
    }

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
                        onDragOver={(event) => this.allowDrop(event)} 
                        onDrop={(event) => this.handleDrop(event, index + 1)} 
                        style={{height: '100%'}}>
                            {this.state.lines.getValue(index)}
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