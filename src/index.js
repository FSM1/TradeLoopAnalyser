import React from "react";
import { render } from "react-dom";
import { tradeData, exchangeRateAtTime } from "./data";
import { Typography } from "material-ui-next";
import Slider from "rc-slider";
import { LineChart, Line, XAxis, YAxis, Label } from "recharts";
import "rc-slider/assets/index.css";

const TradeGraph = ({chartData}) => {
  console.log(chartData);
  return (
    <div>
      <LineChart width={400} height={300} data={chartData}>
        <Line type="linear" dataKey="yLabel" />
        <XAxis dataKey="time"></XAxis>
        <YAxis dataKey="yLabel" type="category" />
      </LineChart>
    </div>
  );
};

const SelectorSlider = ({maxValue, onChanged}) => {
  const Range = Slider.Range;
  const sliderStyle = { width: 330, paddingLeft: 65 };

  return (
    <div style={sliderStyle}>
      <Range
        dots
        allowCross={false}
        defaultValue={[0, maxValue]}
        min={0}
        max={maxValue}
        onChange={onChanged}
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
      toIndex: props.trades.length,
      symbolsMap: this.getAllSymbols(props.trades),
    };
  }

  getAllSymbols = (trades) => {
      const fromSymbols = [...new Set(trades.map(t => t.fromSymbol))];
      const toSymbols = [...new Set(trades.map(t => t.toSymbol))];

      return Array.from(new Set(fromSymbols.concat(toSymbols)));
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

    const generateGraphData = (trades) => {
          const StartingPoint = {
              yLabel: trades[0].fromSymbol,
              yValue: this.state.symbolsMap.indexOf(trades[0].fromSymbol),
              time: 0,
          };

          return [StartingPoint, ...trades.map(t => ({
                  yLabel: t.toSymbol,
                  yValue: this.state.symbolsMap.indexOf(t.toSymbol),
                  time: t.id
              })
          )];
      };

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
        <TradeGraph chartData={generateGraphData(this.props.trades)} />
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
