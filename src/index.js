import React from "react";
import { render } from "react-dom";
import { tradeData } from "./data";
import { Typography, Paper } from "material-ui-next";
import Slider from "rc-slider";
import { LineChart, Line } from "recharts";

const TradeGraph = chartData => {
  console.log(chartData);
  return (
    <div>
      <LineChart width={300} height={300} data={chartData}>
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

const SelectorSlider = () => {
  const Range = Slider.Range;
  const sliderStyle = { width: 400, margin: 50 };

  function log(value) {
    console.log(value); //eslint-disable-line
  }

  return (
    <div style={sliderStyle}>
      <Typography>Slider</Typography>
      <Range allowCross={false} defaultValue={[0, 20]} onChange={log} />
    </div>
  );
};

const ResultDisplay = ({ Direct, Route }) => {
  console.log(Direct);
  console.log(Route);
  return (
    <div>
      <Typography>HODL: {Direct}</Typography>
      <Typography>Route: {Route}</Typography>
    </div>
  );
};
const TradeLoopAnalyser = () => {
  // TODO This will be from the API
  const graphData = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
  ];

  const resultData = {
    Direct: 3,
    Route: -10
  };

  return (
    <div>
      <TradeGraph chartData={graphData} />
      <SelectorSlider />
      <ResultDisplay resultData={resultData} />
    </div>
  );
};
render(<TradeLoopAnalyser />, document.getElementById("root"));
