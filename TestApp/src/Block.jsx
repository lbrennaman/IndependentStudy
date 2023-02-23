import React from 'react';

export class Block extends React.Component {
    constructor(properties) {
        super(properties);
        this.state = { blockTree: new BlockTree() };
    }

    render() {
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
    
        return(
            <div className={"row p-0 m-0"} style={{height: '100%'}}>
                {element}
            </div>
        )
    }
}

class BlockTree {
    constructor() {
        this.root = new TreeNode({
            value: "Root", 
            left: <UserInput />, 
            right: <UserInput />
        });
        this.current = this.root;
    }

    getValue() {
        return this.current.value;
    }

    setValue(value) {
        this.current.setValue(value);
    }

    getBlock() {
        this.current = this.root;
        var field_list = [];
        this.getBlockRecursion(this.current, 0, field_list);
        return field_list;
    }

    getBlockRecursion(node, count, field_list) {
        if (node.left) {
            this.getBlockRecursion(node.left, (2 * count + 1), field_list);
        }

        if (node.right) {
            this.getBlockRecursion(node.right, (2 * count + 2), field_list);
        } else {
            field_list.push(node);
        }
    }

    getCurrent() {
        return this.current;
    }

    setCurrent(index) {
        this.current = this.root;
        this.setCurrentRecursion(this.current, index, 0);
    }

    setCurrentRecursion(node, index, count) {
        if (count == index) {
            this.current = node;
        } else { // If unable to find node, return null
            this.current = null;
        }

        if (node.left && count < index) {
            this.setCurrentRecursion(node.left, index, (2 * count + 1));
        }

        if (node.right && count < index) {
            this.setCurrentRecursion(node.right, index, (2 * count + 2));
        }
    }

    getLeft() {
        return this.current.left;
    }

    setLeft(value) {
        this.current.setLeft(value);
    }

    getRight() {
        return this.current.right;
    }

    setRight(value) {
        this.current.setRight(value);
    }

    print() {
        this.root.print();
    }
}

class TreeNode {
    stringRepresentation = "";
    left = null;
    right = null;
    left_op = "";
    right_op = "";

    constructor(treeNodeSettings = {}) {
        if (treeNodeSettings.value != null) {
            this.value = treeNodeSettings.value;
        } else {
            this.value = null;
        }

        if (typeof(treeNodeSettings.left) === 'object') {
            this.left = treeNodeSettings.left;
        } else {
            if (treeNodeSettings.left != null) {
                this.left = new TreeNode({ value: treeNodeSettings.left });
            } else {
                this.left = null;
            }
        }

        if (typeof(treeNodeSettings.right) === 'object') {
            this.right = treeNodeSettings.right;
        } else {
            if (treeNodeSettings.right != null) {
                this.right = new TreeNode({ value: treeNodeSettings.right });
            }
            else {
                this.right = null;
            }
        }

        if (treeNodeSettings.left_op != null) {
            this.left_op = treeNodeSettings.left_op;
        }

        if (treeNodeSettings.right_op != null) {
            this.left_op = treeNodeSettings.right_op;
        }
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
    }

    getLeft() {
        return this.left;
    }

    setLeft(value) {
        this.left = new TreeNode({value: value});
    }

    getRight() {
        return this.right;
    }

    setRight(value) {
        this.right = new TreeNode({value: value});
    }

    print() {
        console.log("   Value: " + this.value);
        console.log("\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/");
        console.log("\nLeft: \n", this.left);
        console.log("\nRight: \n", this.right);
        console.log("\n^^^^^^^^^^^^^^^^^^^^^^^");
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