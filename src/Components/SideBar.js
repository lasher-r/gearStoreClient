import React from "react";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Fab, TextField, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete"

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: 0,
    margin: 10,
    float: "right",
  },
  edit: {
    marginLeft: 3,
    marginRight: 3,
  },
}));

export default function SideBar(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [addingPack, setAddingPack] = React.useState(false);
  const [newPack, setNewPack] = React.useState("");
  const { packs, setView, addPack, removePack } = props;

  const classes = useStyles();

  const handleListItemClick = (e, i, view) => {
    setView(view);
    setSelectedIndex(i);
  };

  const handleEdit = (e) => {
    if (addingPack) {
      addPack({
        name: newPack,
        gear: [],
      });
    }
    setAddingPack(!addingPack);
  };

  return (
    <>
      <Divider />
      <List>
        <ListItem
          button
          key={0}
          onClick={(event) => handleListItemClick(event, 0, "gear")}
          selected={selectedIndex === 0}
        >
          <ListItemText primary={"All gear"} />
        </ListItem>
      </List>
      <Divider />
      {packs.map((text, index) => (
        <ListItem
          button
          key={index + 1}
          onClick={(event) => handleListItemClick(event, index + 1, text)}
          selected={selectedIndex === index + 1}
        >
          <ListItemText primary={text} secondary={null}/>
          
            <IconButton aria-label="delete" onClick={e=>{
              e.preventDefault()
              removePack(index)
            }}>
              <DeleteIcon />
            </IconButton>

        </ListItem>
      ))}
      {addingPack && (
        <TextField
          className={classes.edit}
          label="Name"
          id="outlined-start-adornment"
          variant="outlined"
          size="small"
          value={newPack}
          onChange={(e) => setNewPack(e.target.value)}
        />
      )}
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="add"
        size="small"
        onClick={handleEdit}
      >
        {!addingPack && <AddIcon />}
        {addingPack && <DoneIcon />}
      </Fab>
    </>
  );
}
