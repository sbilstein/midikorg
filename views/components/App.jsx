import React from "react";
import Knob from "./Knob";

export default class App extends React.Component {

  constructor () {
    super();
    this.state = {knobVal: 0};
  }

  render () {
    return (
      <div style={{textAlign: "center", fontFamily: "sans-serif"}}>
        <h1>Microkorg</h1>
        <Knob
          label="Mod Wheel"
          value={this.state.knobVal}
          onChange={(val) => this.setState({knobVal: val})}
        />
      </div>
    );
  }
}

