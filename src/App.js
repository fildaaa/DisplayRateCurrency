import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const selectedCurrencies = ["CAD", "IDR", "JPY", "CHF", "EUR", "GBP"];

  const getCurrency = async () => {
    try {
      const response = await axios.get("https://api.currencyfreaks.com/v2.0/rates/latest", {
        params: {
          apikey: "0ca8ceb839e849ae8af3cf234627d11c",
        },
      });
      if (response.data && response.data.rates) {
        const currenciesArray = Object.entries(response.data.rates).filter(([code]) =>
          selectedCurrencies.includes(code)
        );
        setCurrencies(currenciesArray);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      console.error("Error details:", error.response?.data || error);
    }
    
  };

  useEffect(() => {
    getCurrency();
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-info-subtle">
      <div className="container text-center">
        <h2 className="mb-2">Rate Currency</h2>
        <table className="table table-borderless table-info">
          <thead>
            <tr>
              <th>Currency</th>
              <th>We Buy</th>
              <th>Exchange Rate</th>
              <th>We Sell</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map(([code, rate], index) => (
              <tr key={index}>
                <td>{code}</td>
                <td>{(Number(rate)*1.05).toFixed(4)}</td>
                <td>{Number(rate).toFixed(4)}</td>
                <td>{(Number(rate)*0.95).toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mb-0">
          Rates are based from 1 USD.
        </p>
        <p className="mb-0">
          This application uses API from&nbsp;
          <a href="https://currencyfreaks.com" target="_blank" rel="noreferrer">CurrencyFreaks</a>.
        </p>
      </div>
    </div>
  );
};

export default App;
