import React from "react";
import StyleColorButton from "./StyleColorButton";
import { makeStyles } from "@material-ui/core/styles";
import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey,
} from "@material-ui/core/colors";

var COLORS = [
  { label: "Red", style: "red", color: red[500] },
  { label: "Pink", style: "pink", color: pink[500] },
  { label: "Purple", style: "purple", color: purple[500] },
  { label: "DeepPurple", style: "deepPurple", color: deepPurple[500] },
  { label: "Indigo", style: "indigo", color: indigo[500] },
  { label: "Blue", style: "blue", color: blue[500] },
  { label: "LightBlue", style: "lightBlue", color: lightBlue[500] },
  { label: "Cyan", style: "cyan", color: cyan[500] },
  { label: "Teal", style: "teal", color: teal[500] },
  { label: "Green", style: "green", color: green[500] },
  { label: "LightGreen", style: "lightGreen", color: lightGreen[500] },
  { label: "Lime", style: "lime", color: lime[500] },
  { label: "Yellow", style: "yellow", color: yellow[500] },
  { label: "Amber", style: "amber", color: amber[500] },
  { label: "Orange", style: "orange", color: orange[500] },
  { label: "DeepOrange", style: "deepOrange", color: deepOrange[500] },
  { label: "Brown", style: "brown", color: brown[500] },
  { label: "Grey", style: "grey", color: grey[500] },
  { label: "BlueGrey", style: "blueGrey", color: blueGrey[500] },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
}));

const ColorControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {COLORS.map((type) => (
        <StyleColorButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          color={type.color}
        />
      ))}
    </div>
  );
};

export default ColorControls;
