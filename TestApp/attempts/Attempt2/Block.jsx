import React from 'react';

export class Block extends React.Component {
    constructor(properties) {
        super(properties);
        this.state = { fields: 
            [<UserInput />, 
            <UserInput />]};

        this.onK = this.onK.bind(this);
    }

    onK(event) {
        this.setState({fields: [<UserInput left={"-"} right={"A"}/>, <UserInput left={"AAA"}/>]});
    }

    render() {
        /*
        var field_list = this.state.blockTree.getBlock();
        console.log(field_list);
        var element;
        
        for (var i = field_list.length - 1; i > -1; i--) {
            if (i == field_list.length - 1) {
                element = <div className={"row p-0 m-0"} style={{height: '100%'}}>
                        <div className="col p-0 m-0" style={{height: '100%', width: '100%'}}>
                            {field_list[i]}
                        </div>
                    </div>
            } else {
                element = <div className={"row p-0 m-0"} style={{height: '100%'}}>
                    <div className="col p-0 m-0" style={{height: '100%', width: '100%'}}>
                        {field_list[i]}
                    </div>
                    <div className="col p-0 m-0" style={{height: '100%', width: '100%'}}>
                        {element}
                    </div>
                </div>
            }
        }
        */

        console.log(this.state.fields);
    
        return(
            <div id={"BLOCK"} className={"row p-0 m-0"} style={{height: '100%'}} onKeyDown={(event) => this.onK(event)}>
                <div className="col p-0 m-0" style={{height: '100%', width: '100%'}}>
                        {this.state.fields[0]}
                    </div>
                    <div className="col p-0 m-0" style={{height: '100%', width: '100%'}}>
                        {this.state.fields[1]}
                    </div>
            </div>
        )
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
            onKeyDown: properties.onKeyDown,
            onDragOver: properties.onDragOver,
            onDrop: properties.onDrop
        }

        console.log("UserInput created!");

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
                    <div className={"col-1 p-0 m-0"} style={{height: '100%'}}>
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
                                onDragOver={this.state.onDragOver}
                                onDrop={this.state.onDrop}
                                onKeyDown={this.state.onKeyDown}
                                onChange={this.state.onChange}
                                onInput={(event) => this.setValue(event)}>
                            </textarea>
                        </form>
                    </div>
                    <div className={"col-1 p-0 m-0"} style={{height: '100%'}}>
                        <div className={"p-0 m-0"} style={{height: '100%', width: '100%'}}>{this.state.right}</div>
                    </div>
                </div>
            </div>
        )
    }
}

/*
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
*/

export default Block;