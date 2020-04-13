import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    width: "20px",
    height: "20px",
  },
});

class StyleColorButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div
        className={classes.root}
        onMouseDown={this.onToggle}
        style={{ backgroundColor: this.props.color }}
      ></div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(StyleColorButton);
