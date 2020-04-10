import React from "react";
import StyleButton from "./StyleButton";

var COLORS = [
  { label: "Red", style: "red" },
  { label: "Pink", style: "pink" },
  { label: "Purple", style: "purple" },
  { label: "DeepPurple", style: "deepPurple" },
  { label: "Indigo", style: "indigo" },
  { label: "Blue", style: "blue" },
  { label: "LightBlue", style: "lightBlue" },
  { label: "Cyan", style: "cyan" },
  { label: "Teal", style: "teal" },
  { label: "Green", style: "green" },
  { label: "LightGreen", style: "lightGreen" },
  { label: "Lime", style: "lime" },
  { label: "Yellow", style: "yellow" },
  { label: "Amber", style: "amber" },
  { label: "Orange", style: "orange" },
  { label: "DeepOrange", style: "deepOrange" },
  { label: "Brown", style: "brown" },
  { label: "Grey", style: "grey" },
  { label: "BlueGrey", style: "blueGrey" },
];

const ColorControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {COLORS.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default ColorControls;
