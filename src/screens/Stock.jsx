import React, { useState, useEffect } from 'react';
import "../css/stock.css";
import StockChart from '../components/Stockchart';
import axios from 'axios';

export default function Stock() {
  const [stockdata, setstockData] = useState([]);
  const TOKEN = "cjutf79r01qlmkvcr39gcjutf79r01qlmkvcr3a0";
  const urlbase = "https://finnhub.io/api/v1/quote";

  useEffect(() => {
    const stocklist = ["AAPL", "MSFT", "TSLA", "FB", "BABA", "UBER", "DIS", "SBUX"];
    const promises = stocklist.map((stock) =>
      getstockdata(stock).then((res) => ({ name: stock, ...res.data }))
    );

    Promise.all(promises)
      .then((data) => {
        console.log(data);
        setstockData(data);
      })
      .catch((error) => {
        console.error("Error fetching stock data", error.message);
      });
  }, []);

  const getstockdata = (stock) => {
    return axios
      .get(`${urlbase}?symbol=${stock}&token=${TOKEN}`)
      .catch((error) => {
        console.error("Error fetching stock data", error.message);
      });
  };

  return (
    <div className='stock-container'>
      <div className="title">Gear Up Your Stocks</div>
      <div className="stock-body">
        <div className="charts">
          <StockChart  />
        </div>
        <div className="stocks">
          <ul>
            {stockdata.map((stock) => (
              <li key={stock.name}>
                <strong>{stock.name}: </strong>
                Price: {stock.c}, Open: {stock.o}, High: {stock.h}, Low: {stock.l}, Volume: {stock.v}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
