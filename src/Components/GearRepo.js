import Accordion from "@material-ui/core/Accordion";
import {
  AccordionSummary,
  AccordionDetails,
  TableContainer,
  Table,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: 0,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  table: {
    maxHeight: 440,
  },
}));

export default function GearRepo(props) {
  const { packId, gear, addGearToPack } = props;
  const classes = useStyles();

  const handleAddClick = (item) => {
    addGearToPack(item, packId);
  };

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandLessIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Add gear to pack</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                {gear.map((item, i) => (
                  <TableRow key={i}>
                    {Object.values(item).map((v) => (
                      <TableCell>{v}</TableCell>
                    ))}
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        className={classes.margin}
                        size="small"
                        onClick={(_) => {
                          handleAddClick(item);
                        }}
                      >
                        <AddIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
