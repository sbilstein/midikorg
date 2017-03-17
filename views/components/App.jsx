import React from "react";
import Knob from "./Knob";
import WebMidi from 'webmidi';

export default class App extends React.Component {
  initMidi () {
    var self = this
    WebMidi.enable(function (err) {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
      } else {
        // make WebMidi global for easy use in console.
        window.WebMidi = WebMidi;
        console.log("WebMidi enabled!");
        self.setState({
          availableOutputs: WebMidi.outputs
        })
      }
    });
  }

  constructor () {
    super();
    this.initMidi();
    this.state = {
      knobVal: 0,
      currentOutput: "",
      availableOutputs: []
    };
  }

  render () {
    return (
      <div>
        <div>
          <OutputSelector
            availableOutputs={this.state.availableOutputs}
            currentOutput={this.state.currentOutput}
            selectOutput={(output) => alert(output)}
          />
        </div>
        <div style={{textAlign: "center", fontFamily: "sans-serif"}}>
          <h1>Microkorg</h1>
          <Knob
            label="Mod Wheel"
            value={this.state.knobVal}
            onChange={(val) => this.setState({knobVal: val})}
          />
        </div>
      </div>
    );
  }
}

function OutputSelector ({availableOutputs, currentOutput, selectOutput}) {
  var outputNames = availableOutputs.map(function(output) {
    return (
      <option key={output.id}>{output.name}</option>
    )
  })

  return (
    <select value={currentOutput} onChange={selectOutput}>
      {outputNames}
    </select>
  )
}