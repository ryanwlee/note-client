import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import CachedIcon from "@material-ui/icons/Cached";
import CreateIcon from "@material-ui/icons/Create";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: { display: "flex", flexDirection: "row-reverse" },
  icon: { color: grey[400], marginRight: "10px", cursor: "pointer" },
  text: { color: grey[600], marginRight: "30px" },
}));

const ActionControls = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DeleteIcon className={classes.icon} onClick={props.onDelete} />
      <CachedIcon className={classes.icon} onClick={props.onUpdate} />
      <SaveIcon className={classes.icon} onClick={props.onSave} />
      <CreateIcon className={classes.icon} onClick={props.onAdd} />
      {props.changed ? (
        <div className={classes.text}>Some changes. Make sure save!</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ActionControls;
