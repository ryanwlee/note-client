import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { Typography } from "@material-ui/core";
import { convertFromRaw } from "draft-js";
import { titleHelper } from "./helper";

const styles = (theme) => ({
  root: {
    backgroundColor: "#1d1920",
    flexGrow: "1",
    borderRight: "0.5px solid #212125",
  },
  list: {
    backgroundColor: "#1f2125",
    color: grey[300],
    height: "70px",
    borderBottom: "1px solid #1d1919",
    display: "flex",
    cursor: "pointer",
  },
  selectedList: {
    backgroundColor: "#1d1919",
    color: grey[300],
    height: "70px",
    borderBottom: "1px solid #1d1919",
    display: "flex",
    cursor: "pointer",
  },
  listText: {
    color: grey[300],
    margin: "auto 10px auto 10px",
  },
});

class Drawercontent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, notes, handleDrawerClick, curId } = this.props;

    return (
      <div className={classes.root}>
        {notes.length > 0
          ? notes.map((note) => {
              if (note.content === undefined) {
                return "";
              }
              let content = convertFromRaw(
                JSON.parse(note.content)
              ).getPlainText();

              return (
                <div
                  className={
                    note._id === curId ? classes.selectedList : classes.list
                  }
                  key={note._id}
                  onClick={() => handleDrawerClick(note._id)}
                >
                  <Typography
                    variant="body1"
                    gutterBottom
                    className={classes.listText}
                  >
                    {titleHelper(content)}
                  </Typography>
                </div>
              );
            })
          : ""}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Drawercontent);
