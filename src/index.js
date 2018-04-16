import React from "react";
import { render } from "react-dom";
import { tradeData, exchangeRateAtTime } from "./data";
import { Typography } from "material-ui-next";
import Slider from "rc-slider";
import { LineChart, Line } from "recharts";
import "rc-slider/assets/index.css";

const TradeGraph = props => {
  console.log(props);
  return (
    <div>
      <LineChart width={400} height={300} data={props.chartData}>
        <Line type="monotone" dataKey="Value" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

const SelectorSlider = () => {
  const Range = Slider.Range;
  const sliderStyle = { width: 400 };

  function log(value) {
    console.log(value); //eslint-disable-line
  }

  return (
    <div style={sliderStyle}>
      <Range
        allowCross={false}
        defaultValue={[0, 20]}
        min={0}
        max={50}
        onChange={log}
        step={10}
      />
    </div>
  );
};

const ResultDisplay = props => {
  return (
    <div>
      <Typography>HODL: {props.resultData.Direct * 100}</Typography>
      <Typography>Route: {props.resultData.Route * 100}</Typography>
    </div>
  );
};
const TradeLoopAnalyser = () => {
  function determineDirectReturn(trades) {
    // get Ending Value
    const endingValue = exchangeRateAtTime(
      trades[0].fromSymbol,
      trades[trades.length - 1].toSymbol,
      trades.length - 1
    );

    // get Starting Value
    const startingValue = exchangeRateAtTime(
      trades[0].fromSymbol,
      trades[trades.length - 1].toSymbol,
      0
    );

    const result = (endingValue - startingValue) / startingValue;
    return result;
  }

  function determineRouteReturn(trades) {
    // get Ending Value

    const endingValue = trades
      .map(t => {
        return t.price;
      })
      .reduce((p, c, i) => {
        return p * c;
      });

    // get Starting Value
    const startingValue = exchangeRateAtTime(
      trades[0].fromSymbol,
      trades[trades.length - 1].toSymbol,
      0
    );

    const result = (endingValue - startingValue) / startingValue;
    console.log(endingValue + " - " + startingValue + "=" + result);
    return result;
  }

  const graphData = tradeData.trades.map(t => ({
    Name: t.fromSymbol,
    Value: t.id
  }));

  const resultData = {
    Direct: determineDirectReturn(tradeData.trades),
    Route: determineRouteReturn(tradeData.trades)
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
