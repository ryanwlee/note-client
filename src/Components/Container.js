import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import EditScreen from "./EditScreen";
import Drawercontent from "./Drawercontent";
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
            <Drawercontent />
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
            <Drawercontent />
          </Drawer>
        </Hidden>
      </nav>
      <EditScreen />
    </div>
  );
}

export default Container;
