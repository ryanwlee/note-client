import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import CachedIcon from "@material-ui/icons/Cached";
import CreateIcon from "@material-ui/icons/Create";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: { display: "flex", flexDirection: "row-reverse" },
  icon: { color: grey[400], marginRight: "10px" },
}));

const ActionControls = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DeleteIcon className={classes.icon} />
      <CachedIcon className={classes.icon} />
      <SaveIcon className={classes.icon} />
      <CreateIcon className={classes.icon} />
    </div>
  );
};

export default ActionControls;
