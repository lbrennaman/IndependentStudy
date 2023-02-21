import React from 'react'
import Block from './Block';

// Text used in blocks
export class CreateDivider extends React.Component {
  constructor(properties) {
    super(properties);
    this.state = {
      name: properties.name, 
      value: properties.value,
      style: properties.style
    };

    // Default Divider Bindings
  }

  render() {
    return(
      <p style={this.state.style}>
        {this.state.value}
      </p>
    )
  }
}


// Textarea used in blocks
export class CreateForm extends React.Component {
  constructor(properties) {
    super(properties);
    this.state = {
      name: properties.name, 
      parent: properties.parent,
      type: properties.type,
      style: properties.style,
      onDragOver: properties.onDragOver
    };

    // Bindings
    this.handleChange = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    console.log("Created new text area: ", this.state.name);
    // console.log("Parent: ", this.state.parent.state.name);
  }

  handleKeyDown(event) {
    // If the enter key is pressed and the parent is the current line, tell the parent to create a new line
    if (event.key === 'Enter' && this.state.type != 'block') {
      // Prevent enter's default behavior of adding a new line to text box
      event.preventDefault();

      // Tell this text box's parent's (NewLine) parent (RootLine) to add a NewLine
      this.state.parent.state.parent.addLine();
    } else {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
      console.log("This textbox, ", this.state.name, ", is not a line.");
    }

  }

  render() {
    return(
      <form 
        name={this.state.name} 
        style={{height: '100%', width:'100%'}}
        onDragOver={this.state.onDragOver}>
      <textarea 
        className="p-0 m-0"
        defaultValue={""}
        style={{height: '100%', width:'100%', overflow: 'hidden', resize: 'none', border: 'none', outline: 'none', boxShadow: 'none'}}
        onKeyDown={(event) => this.handleKeyDown(event)}
        onDragOver={this.state.onDragOver}>
      </textarea>
    </form>
    )
  }
}


class NewLine extends React.Component {
  constructor(properties) {
    super(properties);
    this.state = {
      name: properties.name, 
      id: properties.id, 
      parent: properties.parent, 
      lineNumber: properties.lineNumber,
      hidden: properties.hidden
    };

    // Default NewLine Bindings
  }

  render() {
    return(
      <div className="container-fluid p-0 m-0" 
        id={this.state.id} 
        name={this.state.name} 
        style={{height: '100%', width: '100%', border: '2px solid black'}}>

        {/* Line Number and Textarea container*/}
        <div className="row p-0 m-0" style={{height: '100%', width: '100%'}}>

          {/* Line Number */}
          <div className="col-1 p-0 m-0" style={{height: '100%'}}>
            <div style={{height: '100%', width: '100%'}}>{this.state.lineNumber}</div>
          </div>

          {/* Textarea */}
          <div className="col-11 p-0 m-0" style={{height: '100%', position: 'relative'}}>
            <CreateForm name={this.state.name + "form"} parent={this}/>
            <DropZone hidden={true}/>
          </div>
        </div>
      </div>
    )
  }
}

class DropZone extends React.Component {
  constructor(properties) {
    super(properties);
    this.state = {name: properties.name, hidden: properties.hidden};
  
    // Default Dropzone bindings
    this.allowDrop = this.allowDrop.bind(this);
    this.catchDrop = this.catchDrop.bind(this);
    this.switchHideState = this.swtichHideState.bind(this);
  }

  allowDrop(event) {
    event.preventDefault();
    console.log("Allow Drop: ", event.target);
  }

  catchDrop(event) {
    event.preventDefault();

    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));

    console.log("Data: ", data);
    console.log("Target: ", event.target);
  }

  swtichHideState() {
    if (this.state.hidden == true) {
      this.setState({hidden: false})
    } else {
      this.setState({hidden: true})
    }
  }

  render() {
    return(
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%'
      }}
      onDragOver={(event) => this.allowDrop(event)}
      onDrop={(event) => this.catchDrop(event)}
      onMouseOver={() => console.log("POGGERS")}></div>
    )
  }

}

class SetRootLine extends React.Component{
  constructor(properties) {
    super(properties);
    this.state = {name: properties.name, id: properties.id};

    // Binding
    this.addLine = this.addLine.bind(this);
  }

  componentDidMount() {
    this.setState({element: [
    <NewLine 
      id={"line:" + 1} 
      name={"line:" + 1} 
      parent={this} 
      lineNumber={1} 
    />]})
  }
  
  addLine() {
    console.log("Add line!");
    const array = this.state.element;

    // To add a new line after current selected line, must create a child pointer in NewLine and treat NewLines like a linked list
    // I.e.: Newline::line1.child -> Newline::line2.child -> Insert(Newline::line(parent.lineNumber+1).child ->) all following lines: lineNumber++
    array.push(<NewLine id={"line:" + (array.length + 1)} name={"line:" + (array.length + 1)} parent={this} lineNumber={array.length + 1}/>);
    this.setState({element: array})
  }

  render() {
    return (
      this.state.element
    )
  }
}

export default SetRootLine;