import React from 'react'

import Block from './Block'

class SetRootDragZone extends React.Component {
    constructor(properties) {
      super(properties);
      this.state = {name: properties.name}
    }

    allowDrop(event) {
      event.preventDefault();
      console.log("Allow Drop: ", event.target);
    }
  
    catchDrop(event) {
      event.preventDefault();
  
      var data = event.dataTransfer.getData("text");
      console.log("Data: ", data);
      console.log("Target: ", event.target);
      event.target.appendChild(document.getElementById(data));
    }
  
    render() {
      return(
        <div id="DragZoneContainer" className={"container-fluid p-0 m-0"} 
          style={{height: '100%', width: '100%'}}
          onDragOver={(event) => this.allowDrop(event)}
          onDrop={(event) => this.catchDrop(event)}>
            <Block name="#include"/>
        </div>
      )
    }
  }

  export default SetRootDragZone;