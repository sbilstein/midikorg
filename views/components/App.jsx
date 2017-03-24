import React, {PropTypes} from "react";
import Knob from "./Knob";
import WebMidi from 'webmidi';

export default class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      knobVal: 0,
      currentOutput: null,
      availableOutputs: [],
      availableInputs: [],
      inputRx: false,
      outputTx: false,
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
          availableInputs: WebMidi.inputs,
          currentOutput,
        })
      }
    });
  }

  selectOutput = (e) => {
    var output = WebMidi.getOutputById(e.target.value);
    this.setState({
      currentOutput: output,
    });
  }

  selectInput = (e) => {
    var input = WebMidi.getInputById(e.target.value);
    input.addListener('controlchange', "all", this.midiRxCC)
    this.setState({
      currentInput: input,
    });
  }

  midiRxCC = (e) => {
    this.setState({inputRx: true});
    clearTimeout(this.rxListener);
    this.rxListener = setTimeout(() => this.setState({inputRx: false}), 100);
  }

  setCutoff = (val) => {
    this.setState({knobVal: val});
    this.state.currentOutput.sendControlChange("brightness", val, "all");
  }

  render () {
    return (
      <div className={"container"}>
        <div className={"row"}>
          <div style={{textAlign: "center", fontFamily: "sans-serif"}}>
            <h2>MICROKORG</h2>
          </div>
        </div>  
        <div className={"row"}>
          <div className={"two columns"}>
            <h5>A.65</h5>
            <select>
              <option>A.65</option>
            </select>
            <h5>voice</h5>
            LOAD / SAVE Buttons
          </div>
          <div className={"eight columns"}>
            <h3>main panel</h3>
            <Knob
              label="Cutoff"
              value={this.state.knobVal}
              onChange={this.setCutoff}
            />
          </div>
          <div className={"two columns"}>
            outputs <Indicator isOn={this.state.outputTx}/>
            <PortSelector
              availablePorts={this.state.availableOutputs}
              currentPort={this.state.currentOutput}
              selectPort={this.selectOutput}
            />
            inputs <Indicator isOn={this.state.inputRx}/>
            <PortSelector
              availablePorts={this.state.availableInputs}
              currentPort={this.state.currentInput}
              selectPort={this.selectInput}
            />            
          </div>
        </div>
      </div>
    );
  }
}

function PortSelector ({availablePorts, currentPort, selectPort}) {
  var portNames = availablePorts.map(function(port) {
    return (
      <option key={port.id} value={port.id} >{port.name}</option>
    )
  })

  var currentId = currentPort ? currentPort.id : "";

  return (
    <select value={currentId} onChange={selectPort}>
      {portNames}
    </select>
  )
}

PortSelector.propTypes = {
  availablePorts: PropTypes.array.isRequired,
  currentPort: PropTypes.object,
  selectPort: PropTypes.func.isRequired,
}

function Indicator({isOn}) {
  return (
    <div className={"led"}>
      <div className={"led-green " + (isOn ? 'led-on' : '')}></div>
    </div>
  ) 
}