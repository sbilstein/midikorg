import React, {PropTypes} from "react";
import Knob from "./Knob";
import WebMidi from 'webmidi';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    // Binding makes the correct 'this' reference in the callback's context
    this.selectOutput = this.selectOutput.bind(this);
    this.setCutoff = this.setCutoff.bind(this);

    this.state = {
      knobVal: 0,
      currentOutput: null,
      availableOutputs: [],
    };
  }

  componentDidMount () {
    this.initMidi();
  }

  componentWillUnmount () {
    WebMidi.disable();
  }

  initMidi () {
    var self = this
    WebMidi.enable(function(err) {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
      } else {
        // make WebMidi global for easy use in console.
        window.WebMidi = WebMidi;
        console.log("WebMidi enabled!");
        var currentOutput = WebMidi.outputs.length > 0 ? WebMidi.outputs[0] : null;
        self.setState({
          availableOutputs: WebMidi.outputs,
          currentOutput,
        })
      }
    });
  }

  selectOutput (e) {
    var output = WebMidi.getOutputById(e.target.value);
    this.setState({
      currentOutput: output,
    });
  }

  setCutoff (val) {
    this.setState({knobVal: val});
    this.state.currentOutput.sendControlChange("brightness", val, "all");
  }

  render () {
    return (
      <div>
        <div>
          <OutputSelector
            availableOutputs={this.state.availableOutputs}
            currentOutput={this.state.currentOutput}
            selectOutput={this.selectOutput}
          />
        </div>
        <div style={{textAlign: "center", fontFamily: "sans-serif"}}>
          <h1>Microkorg</h1>
          <Knob
            label="Mod Wheel"
            value={this.state.knobVal}
            onChange={this.setCutoff}
          />
        </div>
      </div>
    );
  }
}

function OutputSelector ({availableOutputs, currentOutput, selectOutput}) {
  var outputNames = availableOutputs.map(function(output) {
    return (
      <option key={output.id} value={output.id} >{output.name}</option>
    )
  })

  var currentId = currentOutput ? currentOutput.id : null;

  return (
    <select value={currentId} onChange={selectOutput}>
      {outputNames}
    </select>
  )
}

OutputSelector.propTypes = {
  availableOutputs: PropTypes.array.isRequired,
  currentOutput: PropTypes.object,
  selectOutput: PropTypes.func.isRequired,
}
