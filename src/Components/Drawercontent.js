import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors";

const styles = (theme) => ({
  root: {
    backgroundColor: blueGrey[900],
    flexGrow: "1",
    borderRight: "1px solid black",
  },
});

class Drawercontent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return <div className={classes.root} />;
  }
}

export default withStyles(styles, { withTheme: true })(Drawercontent);
