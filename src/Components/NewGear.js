import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Paper,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableBody,
  TextField,
  IconButton,
  TableCell,
  TableRow,
  InputLabel,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    marginTop: 15,
  },
});

export default function NewGear(props) {
  const { addGear } = props;
  const [newName, setName] = React.useState("");
  const [newDescription, setDescription] = React.useState("");
  const [newCategory, setCategory] = React.useState("");
  const [newWeight, setWeight] = React.useState("");
  const [newClass, setClass] = React.useState("");

  const clear = () => {
    setClass("");
    setName("");
    setDescription("");
    setCategory("");
    setWeight("");
  };

  const classes = useStyles();
  return (
    <TableContainer className={classes.container} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell>
              <TextField
                label="Name"
                id="outlined-start-adornment"
                variant="outlined"
                size="small"
                value={newName}
                onChange={(e) => setName(e.target.value)}
              />
            </TableCell>
            <TableCell>
              <TextField
                label="description"
                id="outlined-start-adornment"
                variant="outlined"
                size="small"
                multiline
                value={newDescription}
                onChange={(e) => setDescription(e.target.value)}
              />
            </TableCell>
            <TableCell>
              <TextField
                label="category"
                id="outlined-start-adornment"
                variant="outlined"
                size="small"
                value={newCategory}
                onChange={(e) => setCategory(e.target.value)}
              />
            </TableCell>

            <TableCell>
              <InputLabel>Class</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newClass}
                onChange={(e) => setClass(e.target.value)}
              >
                <MenuItem value={"pack"}>pack</MenuItem>
                <MenuItem value={"consumable"}>consumable</MenuItem>
                <MenuItem value={"worn/carried"}>worn/carried</MenuItem>
              </Select>
            </TableCell>

            <TableCell>
              <TextField
                label="weight"
                id="outlined-start-adornment"
                variant="outlined"
                size="small"
                type="number"
                value={newWeight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </TableCell>

            <TableCell>
              <IconButton
                aria-label="add"
                size="small"
                onClick={(_) => {
                  addGear({
                    name: newName,
                    description: newDescription,
                    category: newCategory,
                    class: newClass,
                    weight: newWeight,
                  });
                  clear();
                }}
              >
                <AddIcon fontSize="inherit" />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
