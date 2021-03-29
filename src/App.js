import React from "react";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import SideBar from "./Components/SideBar";
import GearTable from "./Components/GearTable";
import NewGear from "./Components/NewGear";
import GearRepo from "./Components/GearRepo";
import PackSummery from "./Components/PackSummery";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState("gear");
  const [gear, setGear] = React.useState([]);
  const [packs, setPacks] = React.useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addGear = (item) => {
    setGear([...gear, item]);
  };

  const addPack = (item) => {
    setPacks([...packs, item]);
  };

  const changeView = (view) => {
    setView(view);
  };

  const addGearToPack = (item, packId) => {
    let p = [...packs];
    p = p.reduce((a, c) => {
      if (c._id === packId) {
        c.gear.push(item);
      }
      a.push(c);
      return a;
    }, []);
    setPacks(p);
  };

  const removeFromGear = (i) => {
    const newGear = [...gear];
    newGear.splice(i, 1);
    setGear(newGear);
  };

  const removePack = (i) => {
    const newPacks = [...packs]
    newPacks.splice(i, 1)
    setPacks(newPacks)
    // supper hacky but I couldn;t get secondary list item actions to look good
    setTimeout(()=>{setView('gear')}, 1)
  }

  const removeGearFromPackC = (packName) => {
    return (gearI) => {
      const p = [...packs];
      const index = p.map((e) => e.name).indexOf(packName);
      p[index].gear.splice(gearI, 1);
      setPacks(p);
    };
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap>
            {view}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <SideBar
          packs={packs.map((v, i) => v.name)}
          setView={changeView}
          addPack={addPack}
          removePack={removePack}
        />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {view === "gear" && (
          <>
            <GearTable gear={gear} handleRemove={removeFromGear} />
            <NewGear addGear={addGear} />
          </>
        )}

        {view !== "gear" && (
          <>
            <PackSummery pack={packs.filter((x) => x.name === view)[0]} />
            <GearTable
              gear={packs.filter((x) => x.name === view)[0]?.gear}
              handleRemove={removeGearFromPackC(view)}
            />
            <GearRepo
              packId={packs.filter((x) => x.name === view)[0]?._id}
              gear={gear}
              addGearToPack={addGearToPack}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
