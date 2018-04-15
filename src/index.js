import React from "react";
import { render } from "react-dom";
import { tradeData } from "./data";
import { Typography, Paper } from "material-ui-next";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const TradeLoopAnalyser = () => (
  <div style={styles}>
    <Paper>
      <Typography />
    </Paper>
  </div>
);

render(<TradeLoopAnalyser />, document.getElementById("root"));
