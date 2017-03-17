import React, {PropTypes} from "react";
import Knob from "react-canvas-knob";

const noop = () => {}; // onChangeEnd throws if not provided?

export default function SynthKnob ({label, value, onChange}) {
  return (
    <div style={unselectable}>
      <Knob
        width={60}
        height={60}
        min={0}
        max={127}
        angleArc={270}
        angleOffset={225}
        lineCap={"round"}
        fgColor="#000"
        thickness={0.4}
        cursor={0.1}
        onChangeEnd={noop}
        value={value}
        onChange={onChange}
        title={label}
      />
      <div>{label}</div>
    </div>
  )
}

SynthKnob.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

const unselectable = {
  userSelect: "none",
  cursor: "default",
};


// value numeric value of knob n/a
// onChange  function to be called on user input with the current numerical value  n/a
// onChangeEnd function to be called on mouseUp or touchEnd with the current numerical value n/a
// min min value 0
// max max value 100
// step  step size 1
// log enable logarithmic scale (must use non-zero min and max, step > 1)  false
// width or height dimension of square (px)  200
// thickness gauge thickness 0.35
// lineCap gauge stroke ending style (butt or round) "butt"
// bgColor background color  "#EEE"
// fgColor foreground color  "#EA2'
// inputColor  text color  fgColor
// font  font family 'Arial'
// fontWeight  font weight 'bold'
// clockwise direction of progression  true
// cursor  use cursor display mode - give width value or true which uses the default cursor width (30) false
// stopper stop at min & max on keydown/mousewheel true
// readOnly  disable all user input  false
// disableTextInput  disable manual text input only  false
// displayInput  show numeric input box  true
// displayCustom function that will render your custom component in the centre. (Make sure to set displayInput as false, as that takes priority) n/a
// angleArc  arc size in degrees 360
// angleOffset starting angle in degrees 0
// disableMouseWheel disable changes on mouse wheel use  false
// title adds title attribute to the wheel value