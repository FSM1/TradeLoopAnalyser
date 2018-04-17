import React from "react";
import { render } from "react-dom";
import { tradeData, exchangeRateAtTime } from "./data";
import { Typography } from "material-ui-next";
import Slider from "rc-slider";
import { LineChart, Line } from "recharts";
import "rc-slider/assets/index.css";

const TradeGraph = props => {
  return (
    <div>
      <LineChart width={400} height={300} data={props.chartData}>
        <Line type="linear" dataKey="Value" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

const SelectorSlider = props => {
  const Range = Slider.Range;
  const sliderStyle = { width: 400 };

  return (
    <div style={sliderStyle}>
      <Range
        dots
        allowCross={false}
        defaultValue={[0, props.maxValue]}
        min={0}
        max={props.maxValue}
        onChange={props.onChanged}
        step={1}
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

class TradeLoopAnalyser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromIndex: 0,
      toIndex: props.trades.length
    };
  }

  handleUpdate = (newRange) => {
    this.setState({
        fromIndex: newRange[0],
        toIndex: newRange[1],
    })
  };


  render() {
    function determineDirectReturn(trades) {
      console.log(trades);
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
      const endingValue = trades
        .map(t => {
          return t.price;
        })
        .reduce((previous, current) => {
          return previous * current;
        });

      console.log(trades[0].fromSymbol);
      console.log(trades[trades.length - 1].toSymbol);
      const startingValue = exchangeRateAtTime(
        trades[0].fromSymbol,
        trades[trades.length - 1].toSymbol,
        0
      );

      const result = (endingValue - startingValue) / startingValue;
      console.log(endingValue + " - " + startingValue + "=" + result);
      return result;
    }




    const graphData = this.props.trades.map(t => ({
      Label: t.fromSymbol,
      Value: t.id
    }));

    const newGraphData = function() {
      const currencies = [...this.props.trades.map(t => t.fromSymbol), ...this.props.trades.map(t => t.toSymbol)];

      const StartingPoint = {
        Time: 0,
        YLabel:this.props.trades[0].fromSymbol,
          YValue:currencies.indexOf(this.props.trades[0].fromSymbol)
      }

      return [StartingPoint, ...this.props.trades.map(t => ({
          YLabel: t.toSymbol,
          YValue: currencies.indexOf(t.toSymbol),
          Time: t.id
        })
      )];
    };

    //console.log(newGraphData());

    const resultData = {
      Direct: determineDirectReturn(
        this.props.trades.slice(this.state.fromIndex, this.state.toIndex)
      ),
      Route: determineRouteReturn(
        this.props.trades.slice(this.state.fromIndex, this.state.toIndex)
      )
    };

    return (
      <div>
        <TradeGraph chartData={graphData} />
        <SelectorSlider maxValue={this.props.trades.length} onChanged={this.handleUpdate} />
        <ResultDisplay resultData={resultData} />
      </div>
    );
  }
}

render(
  <TradeLoopAnalyser trades={tradeData.trades} />,
  document.getElementById("root")
);
