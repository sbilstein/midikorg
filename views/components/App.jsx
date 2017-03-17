import React from 'react';
import Knob from 'react-canvas-knob';

export default class App extends React.Component {

  constructor () {
    super();
    this.state = {knobVal: 0};
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Microkorg</h1>
        <Knob
          title="Mod Wheel"
          width={30}
          value={this.state.knobVal}
          onChange={(val) => this.setState({knobVal: val})}
          onChangeEnd={(val) => console.log("Ended at val", val)}
        />
      </div>
    );
  }
}
