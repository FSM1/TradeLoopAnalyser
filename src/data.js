const tradeData = {
  trades: [
    {
      id: 1,
      fromSymbol: "ZAR",
      toSymbol: "BTC",
      price: 25
    },
    {
      id: 2,
      fromSymbol: "BTC",
      toSymbol: "ETH",
      price: 0.4
    },
    {
      id: 3,
      fromSymbol: "ETH",
      toSymbol: "EOS",
      price: 7.5
    }
    //    {
    //      id: 4,
    //      fromSymbol: "EOS",
    //      toSymbol: "BTC",
    //      price: 50
    //    },
    //    {
    //      id: 5,
    //      fromSymbol: "BTC",
    //      toSymbol: "ETH",
    //      price: 0.36
    //    },
    //    {
    //      id: 6,
    //      fromSymbol: "ETH",
    //     toSymbol: "EOS",
    //      price: 45
    //    }
  ]
};

// This function is a stubbed out API call.
// This would be a query to an internal API
function exchangeRateAtTime(fromSymbol, toSymbol, time) {
  const pair = fromSymbol + toSymbol;
  const baseRates = {
    ZARBTC: 25,
    BTCETH: 0.41,
    ZAREOS: 87
  };

  const baseRate = baseRates[pair];
  //console.log("Base rate: " + baseRate);
  const random = Math.floor(Math.random() * 20) - 10;
  let result = baseRate;
  for (var i = 0; i < time; i++) {
    console.log("adding random");
    result = baseRate * (1 + random / 100);
  }
  return result;
}

export { tradeData, exchangeRateAtTime };
