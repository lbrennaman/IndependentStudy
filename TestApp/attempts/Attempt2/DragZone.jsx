import React from 'react';
import { UserInput, Block } from './Block';

const math_ops = [" + ", " - ", " / ", " * ", " % "];                                           
const math_assign_ops = [" = ", " += ", " -= ", " /= ", " *= ", " %= "];                          
const bit_assign_ops = [" &= ", " |= ", " ^= ", " <<= ", " >>= "];                               
const bool_ops = [" && ", " || ", " == ", " != ", " > ", " < ", " >= ", " <= ", " <=> ", " !"];  
const bitwise_ops = [" & ", " | ", " ^ ", " << ", " >> "];                                      
const inc_dec_ops = [" ++", " --"];                                                             
const ptr_ops = [" *", " &", "new ", "delete "];                                                  
const misc_ops = ["::", " ? ", ", ", " << ", " >> "];                                            

const left_ops = [math_ops, math_assign_ops, bit_assign_ops, bool_ops, bitwise_ops, inc_dec_ops, ptr_ops, misc_ops];
const right_ops = ["[]", ".", "->", "++ ", "-- ", " : "];

export var op_list = [];

function listAllRightOps(leftBlock, rightCondition) {
    if (leftBlock.length == 0) {
        return null;
    }

    if (rightCondition == "") {
        return(
            <div className={"row p-0 m-0"} 
                style={{width: '100%', height: '30px', border: '2px solid yellow'}} 
                draggable={"true"}
                onDrag={(event) => op_list = [leftBlock[0], ""]}>
                <div className={"col p-0 m-0"} style={{width: '100%', height: '100%'}}>
                    <UserInput left={leftBlock[0]}/>
                </div>
                <div className={"col p-0 m-0"} style={{width: '100%', height: '100%'}}>
                    <UserInput/>
                </div>
            </div>
        );
    }

    var list = [];
    for (var i = 0; i < right_ops.length; i++) {
        // If not a turnary statement
        if (right_ops[i] != " : " && right_ops[i].includes(rightCondition)) {
            // If the right_op is an array
            if (rightCondition == "[" || rightCondition == "[]") {
                list.push(
                    <div className={"row p-0 m-0"} 
                        style={{width: '100%', height: '30px', border: '2px solid yellow'}} 
                        draggable={"true"}
                        onDrag={(event) => op_list = [leftBlock[0], <UserInput left="[" right="]"/>]}>
                        <div className={"col p-0 m-0"} style={{width: '100%', height: '100%'}}>
                            <UserInput left={leftBlock[0]} right={<UserInput left="[" right="]"/>}/>
                        </div>
                        <div className={"col p-0 m-0"} style={{width: '100%', height: '100%'}}>
                            <UserInput/>
                        </div>
                    </div>);
            } else {
                list.push(
                    <div className={"row p-0 m-0"} 
                        style={{width: '100%', height: '30px', border: '2px solid yellow'}} 
                        draggable={"true"}
                        onDrag={(event) => op_list = [leftBlock[0], right_ops[i]]}>
                        <div className={"col p-0 m-0"} style={{width: '100%', height: '100%'}}>
                            <UserInput left={leftBlock[0]} right={right_ops[i]}/>
                        </div>
                        <div className={"col p-0 m-0"} style={{width: '100%', height: '100%'}}>
                            <UserInput/>
                        </div>
                    </div>);
            }
        } else {
            // If this right_op is :, ensure that the left op is ? (: can only occur with ?)
            if (leftBlock[0][1] == "?" && right_ops[i].includes(rightCondition)) {
                list.push(
                    <div className={"row p-0 m-0"} 
                        style={{width: '100%', height: '30px', border: '2px solid yellow'}} 
                        draggable={"true"}
                        onDrag={(event) => op_list = [leftBlock[0], right_ops[i]]}>
                        <div className={"col p-0 m-0"} style={{width: '100%', height: '100%'}}>
                            <UserInput left={leftBlock[0]} right={right_ops[i]}/>
                        </div>
                        <div className={"col p-0 m-0"} style={{width: '100%', height: '100%'}}>
                            <UserInput/>
                        </div>
                    </div>);
            }
        }
    }
    return list;
}

// Code to build all possible extension blocks
function getBlockList(leftCondition, rightCondition) {
    if (leftCondition == "") {
        return listAllRightOps(["", <UserInput/>], rightCondition);
    }

    var blockList = [];
    for (var i = 0; i < left_ops.length; i++) {
        var block = [];

        // Add left operator to block
        for (var j = 0; j < left_ops[i].length; j++) {
            if (left_ops[i][j].includes(leftCondition)) {
                block.push(left_ops[i][j]);
                block.push(<UserInput/>);
                blockList.push(listAllRightOps(block, rightCondition));
                block = [];
            }
        }

        // Use listAllRightOps to get the BlockList
        //blockList.push(listAllRightOps(block, rightCondition));
    }

    return blockList;
}

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
        this.parseFilters = this.parseFilters.bind(this);
        this.filterBlocks = this.filterBlocks.bind(this);
    }

    // Parse the list of filters from the text in UserInput and return a filtered list of blocks
    setBlockList(event) {
        console.log("Blocklist updated");
        var text = event.target.value;
        var filters = this.parseFilters(text);
        this.setState({blockList: this.filterBlocks(filters)});

        event.stopPropagation();
    }

    handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
        console.log("Block key down: " + event.key);
        this.currentKey = event.key;
    }

    // Parse the list of filters from the line of text and return an array of filters
    parseFilters(text) {
        var left = "";
        var right = "";

        var swtch = 0;
        for (var i = 0; i < text.length; i++) {
            if (swtch == 0 && text[i] != " ") {
                left += text[i];
            } else if (swtch == 1 && text[i] != " ") {
                right += text[i];
            } else {
                swtch++;
            }
        }

        return [left, right];
    }

    // Using the filters, return a list of all possible blocks that match the search criteria
    filterBlocks(filters) {
        return getBlockList(filters[0], filters[1]);
    }

    render() {
        return(
            <div className="container-fluid p-0 m-0" style={{height: '100%'}}>
                <div className="container-fluid p-0 m-0" style={{height: '30px'}}>
                    <SearchBar onChange={(event) => this.setBlockList(event)} onKeyDown={(event) => this.handleKeyDown(event)}/>
                </div>
                <div className="container-fluid p-0 m-0" style={{height: '100%'}}>
                    {this.state.blockList}
                </div>
            </div>
        )
    }
}

class SearchBar extends React.Component {
    constructor(properties) {
        super(properties);
        this.state = {
            onChange: properties.onChange,
            onKeyDown: properties.onKeyDown
        };

        // Default SearchBar Bindings
    }

    render() {
        return(
            <div className="container-fluid p-0 m-0" style={{height: '100%', width: '100%'}}>
                <form className={"p-0 m-0"} style={{height: '100%', width:'100%'}}>
                    <textarea 
                        id={"DragZoneSearchBar"}
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
                        onChange={this.state.onChange}>
                    </textarea>
                </form>
            </div>
        )
    }
}

export default DragZone;