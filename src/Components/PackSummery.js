import React from "react";

import { Grid, Typography, Tooltip } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";

import { PieChart } from "react-minimal-pie-chart";

export default function PackSummery(props) {
  const { pack } = props;

  const colors = ["#192E5B", "#1D65A6", "#72A2C0", "#00743F", "#F2A104"];
  let colorI = 0;
  let data = pack?.gear.reduce((a, c) => {
    if (a.filter((x) => x.title === c.category).length === 0) {
      a.push({
        title: c.category,
        value: 0,
        color: colors[colorI++ % colors.length],
      });
    }
    a = a.map((x) => {
      if (x.title === c.category) {
        x.value += parseInt(c.weight);
      }
      return x;
    });
    return a;
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PieChart
          style={{ height: "200" }}
          data={data}
          label={({ dataEntry }) => `${(dataEntry.value / 16).toFixed(2)} lbs`}
          labelStyle={(index) => ({
            fill: data[index].color,
            fontSize: "8px",
          })}
          radius={42}
          labelPosition={112}
        />
      </Grid>
      <Grid item xs={4}>
        <Tooltip title="Everything in your pack except consumables">
          <Typography variant="h4" gutterBottom>
            <ArrowDownwardIcon size={"large"} />
            {" Base "}
            {(
              pack?.gear
                .filter((x) => x.class === "pack")
                .reduce((a, c) => a + +c.weight, 0) / 16
            ).toFixed(2)}{" "}
            lbs
          </Typography>
        </Tooltip>
      </Grid>
      <Grid item xs={4}>
        <Tooltip title="Base weight plus consumables (food, water, fuel). The consumable weight will change over the course of the trip.">
          <Typography variant="h4" gutterBottom>
            <FastfoodIcon size={"large"} />
            {" Total Pack "}
            {(
              pack?.gear
                .filter((x) => x.class === "pack" || x.class === "consumable")
                .reduce((a, c) => a + +c.weight, 0) / 16
            ).toFixed(2)}{" "}
            lbs
          </Typography>
        </Tooltip>
      </Grid>
      <Grid item xs={4}>
        <Tooltip title="Everything except your naked body weight">
          <Typography variant="h4" gutterBottom>
            <EmojiPeopleIcon size={"large"} />
            {" Skin out "}
            {(pack?.gear.reduce((a, c) => a + +c.weight, 0) / 16).toFixed(2)} lbs
          </Typography>
        </Tooltip>
      </Grid>
    </Grid>
  );
}
