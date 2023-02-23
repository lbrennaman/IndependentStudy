import React from 'react';

export class Block{
    constructor(blockSettings = {}) {
        this.hello = "Hello, world";
    }
}

class BlockNode {
    left = <UserInput left={left_op} right={right_op}/>;
    right = <UserInput/>;
    left_op = "";
    right_op = "";

    constructor(blockNodeSettings = {}) {
        this.left = blockNodeSettings.left;
        this.right = blockNodeSettings.right;
        this.left_op = blockNodeSettings.left_op;
        this.right_op = blockNodeSettings.right_op;
    }
}

export class BlockInput extends React.Component {
    constructor(properties) {
        super(properties);
        this.state = {
            value: properties.value,
            style: properties.style
        }

        // Default BlockInput Function Bindings
        this.getValue = this.getValue.bind(this);
    }

    getValue() {
        return this.state.value;
    }

    render() {
        return(
            <div className="container-fluid p-0 m-0" style={{height: '100%'}}>
                {this.state.value}
            </div>
        )
    }
}

export class UserInput extends BlockInput {
    constructor(properties) {
        super(properties);
        this.state = {
            left: properties.left,
            right: properties.right,
            onChange: properties.onChange,
            onKeyDown: properties.onKeyDown
        }

        // UserInput Function Bindings
        this.setValue = this.setValue.bind(this);
    }

    setValue(event) {
        this.setState({value: event.target.value}); // Note, sets state here but does not update to next state until after function ends
        event.stopPropagation();
    }

    render() {
        return (
            <div className="container-fluid p-0 m-0" style={{height: '100%', width: '100%'}}>
                <div className={"row p-0 m-0"} style={{height: '100%', width: '100%'}}>
                    <div className={"col p-0 m-0"} style={{height: '100%'}}>
                        <p className={"p-0 m-0"} style={{height: '100%', width: '100%'}}>{this.state.left}</p>
                    </div>
                    <div className={"col p-0 m-0"} style={{height: '100%'}}>
                        <form className={"p-0 m-0"} style={{height: '100%', width:'100%'}}>
                            <textarea 
                                id={"UserInput"}
                                className={"p-0 m-0"}
                                defaultValue={""}
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
                                }}
                                onKeyDown={this.state.onKeyDown}
                                onChange={this.state.onChange}
                                onInput={(event) => this.setValue(event)}>
                            </textarea>
                        </form>
                    </div>
                    <div className={"col p-0 m-0"} style={{height: '100%'}}>
                        <div className={"p-0 m-0"} style={{height: '100%', width: '100%'}}>{this.state.right}</div>
                    </div>
                </div>
            </div>
        )
    }
}

class Extender extends BlockInput {
    constructor(properties) {
        super(properties);

        // Extender Function Bindings
        this.addExtender = this.addExtender.bind(this);
    }

    addExtender(event) {
        console.log("Add extender fired!");
    }

    render() {
        return(
            <div className="container-fluid p-0 m-0" style={{height: '100%'}}>
                <div className="row p-0 m-0" style={{height: '100%', width: '100%'}}>
                    <div className="col p-0 m-0" style={{height: '100%'}} onDrop={(event) => this.addExtender(event)}>
                        <UserInput/>
                    </div>
                    <div className="col p-0 m-0" style={{height: '100%'}}>
                    </div>
                </div>
            </div>
        )
    }
}

export default Block;