import React from "react";
import { render } from "react-dom";
import { Typography, Paper } from "material-ui-next";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <Paper>
      <Typography />
    </Paper>
  </div>
);

render(<App />, document.getElementById("root"));
