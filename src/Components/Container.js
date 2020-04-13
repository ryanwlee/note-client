import React, { useEffect, useState } from "react";
import { request } from "graphql-request";
import EditScreen from "./EditScreen";
import Drawercontent from "./Drawercontent";
import { GET_NOTES } from "./graphql/queries";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Hidden, Drawer } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { grey } from "@material-ui/core/colors";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    border: "none",
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    color: grey[200],
    position: "absolute",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

function Container() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClick = (id) => {
    setCurNote(notes.find((note) => note._id === id));
  };

  const [notes, setNotes] = useState([""]);
  const [curNote, setCurNote] = useState(null);

  const jsonData = async (id) => {
    request(process.env.REACT_APP_API_SERVER, GET_NOTES).then((data) => {
      console.log("successfully got data:", data);
      if (data && data.notes.length > 0) {
        console.log("setting data");
        setNotes(data.notes);
        let findId = id ? id : data.notes[0]._id;
        setCurNote(data.notes.find((note) => note._id === findId));
      }
    });
  };

  useEffect(() => {
    request(process.env.REACT_APP_API_SERVER, GET_NOTES).then((data) => {
      console.log("successfully got data:", data);
      if (data && data.notes.length > 0) {
        console.log("setting data", data);
        setNotes(data.notes);
        setCurNote(data.notes[0]);
      }
    });
  }, []);

  return (
    <div className={classes.root}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      {notes.length > 0 ? (
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={"left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <Drawercontent
                notes={notes}
                curId={curNote ? curNote._id : ""}
                handleDrawerClick={handleDrawerClick}
              />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <Drawercontent
                notes={notes}
                curId={curNote ? curNote._id : ""}
                handleDrawerClick={handleDrawerClick}
              />
            </Drawer>
          </Hidden>
        </nav>
      ) : (
        ""
      )}
      {notes.length > 0 && curNote ? (
        <EditScreen curNote={curNote} jsonData={jsonData} />
      ) : (
        ""
      )}
    </div>
  );
}

export default Container;
