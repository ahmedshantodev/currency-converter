import React, { useEffect, useState } from "react";
import country from "./data/country";
import { FaExchangeAlt } from "react-icons/fa";

const App = () => {
  let API_ACCESS_KEY = "b653f48dc5f184234605c167";
  let BASE_URL = `https://v6.exchangerate-api.com/v6/${API_ACCESS_KEY}/pair`;

  const [amount, setAmount] = useState(1);
  const [rate, setRate] = useState("");
  const [fromCurrencyCode, setFromCurrencyCode] = useState(
    country[148].currencyCode
  );
  const [toCurrencyCode, setToCurrencyCode] = useState(
    country[12].currencyCode
  );

  const convert = async () => {
    const url = `${BASE_URL}/${fromCurrencyCode}/${toCurrencyCode}`;
    const response = await fetch(url);
    const data = await response.json();
    setRate(data.conversion_rate);
  };

  useEffect(() => {
    convert();
  }, [amount, fromCurrencyCode, toCurrencyCode]);

  const fromCountryCode = country.filter((item) => {
    return item.currencyCode == fromCurrencyCode && item;
  });

  const toCountryCode = country.filter((item) => {
    return item.currencyCode == toCurrencyCode && item;
  });

  const exchange = () => {
    setFromCurrencyCode(toCurrencyCode);
    setToCurrencyCode(fromCurrencyCode);
  };

  return (
    <section
      className={`bg-background-image w-full h-dvh bg-no-repeat bg-cover flex items-center justify-center`}
    >
      <div className="w-[55%] bg-white rounded-[20px] shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] py-10 px-14">
        <div>
          <h1 className="text-4xl font-inter">Currency Converter</h1>

          <div className="mt-5">
            <label
              htmlFor="amount"
              className="inline-block mb-2 text-xl font-inter"
            >
              Amount
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border-2 border-[#dddddd] rounded-[6px] py-[15px] px-5 focus:outline-[#dddddd] font-inter text-lg text-[#0e0f43]"
            />
          </div>

          <div className="flex items-center gap-5 mt-6">
            <div className="w-[47%]">
              <p className="mb-2 text-xl font-inter">From</p>
              <div className="w-full border-2 border-[#dddddd] rounded-[6px] py-2 px-5 flex">
                <div className="box-content w-[50px] pr-5 relative after:absolute after:top-2/4 after:-translate-y-2/4 after:right-0 after:w-[2px] after:h-full after:bg-[#dddddd]">
                  <img
                    src={`https://flagsapi.com/${fromCountryCode[0].countryCode}/shiny/64.png`}
                    alt="BD-flag"
                    className="w-full"
                  />
                </div>

                <select
                  name="from"
                  id="from"
                  value={fromCurrencyCode}
                  onChange={(e) => setFromCurrencyCode(e.target.value)}
                  className="w-full px-3 font-inter text-2xl text-[#0e0f43] outline-none"
                >
                  {country.map((item, index) => (
                    <option
                      key={index}
                      value={item.currencyCode}
                      className="text-xl"
                    >
                      {item.currencyCode}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-[6%] flex items-center justify-center">
              <FaExchangeAlt
                onClick={exchange}
                className="text-[30px] mt-8 cursor-pointer hover:scale-[1.2] transition-all duration-200"
              />
            </div>

            <div className="w-[47%]">
              <p className="mb-2 text-xl font-inter">To</p>
              <div className="w-full border-2 border-[#dddddd] rounded-[6px] py-2 px-5 flex">
                <div className="box-content w-[50px] pr-5 relative after:absolute after:top-2/4 after:-translate-y-2/4 after:right-0 after:w-[2px] after:h-full after:bg-[#dddddd]">
                  <img
                    src={`https://flagsapi.com/${toCountryCode[0].countryCode}/shiny/64.png`}
                    alt="BD-flag"
                    className="w-full"
                  />
                </div>

                <select
                  name="to"
                  id="to"
                  value={toCurrencyCode}
                  onChange={(e) => setToCurrencyCode(e.target.value)}
                  className="w-full px-3 font-inter text-2xl text-[#0e0f43] outline-none"
                >
                  {country.map((item, index) => (
                    <option
                      key={index}
                      value={item.currencyCode}
                      className="text-xl"
                    >
                      {item.currencyCode}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-end mt-7">
            <div className="w-[55%]">
              <div>
                <h3 className="text-2xl font-inter text-[#5c667b] font-medium mb-3 break-all">
                  {amount} {fromCurrencyCode} =
                </h3>
                <h3 className="text-4xl font-inter text-[#2e3c57] font-medium">
                  {parseInt(rate * amount)}.
                  <span className="text-[#a1a6b0]">
                    {(rate * amount).toString().split(".")[1]}
                  </span>{" "}
                  {toCurrencyCode}{" "}
                </h3>
              </div>
            </div>

            <div className="w-[45%]">
              <button
                onClick={convert}
                className="w-full bg-[#80e142] text-[#163300] py-3 font-inter text-xl font-medium rounded-[30px] transition-all duration-200 active:scale-[0.98] mt-8"
              >
                Convert
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
