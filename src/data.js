const tradeData = [
  {
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
      },
      {
        id: 4,
        fromSymbol: "EOS",
        toSymbol: "XRP",
        price: 50
      }
    ]
  }
];

// This function is a stubbed out API call.
// This would be a query to an internal API
function exchangeRateAtTime(pair, time) {
  const baseRates = {
    ZARBTC: 25,
    BTCETH: 0.41
  };

  return 1;
}

export { tradeData, exchangeRateAtTime };
