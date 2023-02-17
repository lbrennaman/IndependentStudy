import React from 'react'
import { CreateForm  }from './BlockZone'
import { CreateDivider } from './BlockZone'

class Block extends React.Component {
    constructor(properties) {
        super(properties);
        this.state = {
            name: properties.name, 
            value: "",
            forms: [
                <CreateForm name={"BlockForm"} parent={this} type={"Block"}/>
            ],
            dividers: [
                <CreateDivider value="#include <" style={{ 
                    height: '100%', 
                    width:'100%', 
                    textAlign: 'right' 
                }}/>, 
                <CreateDivider value=">" style={{
                    height: '100%', 
                    width:'100%'
                }}/>
            ]};

        // Default Block Bindings
        this.dragEvent = this.dragEvent.bind(this);
    }

    dragEvent(event) {
        console.log("Dragstart!")
        event.dataTransfer.setData("text", event.target.id);
        console.log("Drag id: ", event.target.id);
    }

    render() {
        // Determine the column size for this block
        const columns = this.state.forms.length + this.state.dividers.length;
        
        // Bootstrap has a max of 12 columns per row
        if (columns > 12) {
            console.log("Too many columns!");
        }

        // Set the className for the columns to create
        const colClass = "col-" + (12 / columns) + " p-0 m-0";

        // Initialize the column divs to add to the row to make the block
        const element = [];

        // Add columns for each divider and textarea
        for (let i = 0; i < this.state.dividers.length; i++) {
            element.push(
                <div className={colClass} style={{height: '100%'}}>
                    {this.state.dividers[i]}
                </div>);

            // There should be one less form than divider (no block ends with a textarea)
            if (i < this.state.forms.length) {
                element.push(
                    <div className={colClass} style={{height: '100%'}}>
                        {this.state.forms[i]}
                    </div>);
            }
        }
        
        //  Build the block: 
        /*  Container (block border) {
                Row (Container to split dividers and textareas into columns) {
                    Column (divider)
                    Column (textarea)
                    Column (divider)
                    .
                    .
                    .
                    Column (divider)
                }
        } */
        return(
            <div id={this.state.name + ":" + this.state.value} 
                className="container-fluid p-0 m-0 bg-dark text-white"
                draggable={"true"} 
                onDragStart={(event) => this.dragEvent(event)}
                style={{
                    height: '30px', 
                    width: '100%',
                    border: '2px solid black'
                }}>
                <div className="row p-0 m-0" style={{height: '100%', width: '100%'}}>
                    {element}
                </div>
            </div>
        )
    }
}

// #include <> block
class CppIncludeBlock extends Block {
    constructor(properties) {
      super(properties);
      // this.state = {name: properties.name, value: ""};
  
      // CppIncludeBlock Bindings
      this.getValue = this.getValue.bind(this);
    }
  
    getValue() {
      // Get value of child form and return "#include <" + formValue + ">"
      return "#include <>";
    }
  
    render() {
      return(
        <div className="include" style={{height: '100%'}} draggable="true">
          <div className="row border border-dark bg-dark text-white" style={{height: '100%'}}>
            <div className="col-4 m-0" style={{height: '100%'}}>
              <p style={{ height: '100%', width:'100%', textAlign: 'right' }}>#include &#60;</p>
            </div>
            <div className="col-4 m-0" style={{height: '100%'}}>
              <CreateForm name={this.state.name + "form"} parent={this}/>
            </div>
            <div className="col-4 m-0" style={{height: '100%'}}>
                <p style={{height: '100%', width:'100%' }}>&#62;</p>
            </div>
          </div>
        </div>      
      )
    }
  }
  
  export default Block;