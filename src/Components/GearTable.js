import React from "react";

import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { Paper, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  margin: {
    margin: 10,
    marginBottom: 40,
  },
});

export default function GearTable(props) {
  const classes = useStyles();
  const { gear, handleRemove } = props;

  const headCells = ["name", "description", "category", "class", "weight", ""];

  return (
    <>
      <TableContainer className={classes.margin} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headCells?.map((s, i) => (
                <TableCell>{s}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {gear?.map((item, i) => (
              <TableRow key={i}>
                {Object.values(item).map((v) => (
                  <TableCell>{v}</TableCell>
                ))}
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    onClick={(e) => handleRemove(i)}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
