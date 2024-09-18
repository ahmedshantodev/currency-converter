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
  const [error, setError] = useState(false);

  const convert = async () => {
    if (amount <= 0) {
      setError(true);
    } else {
      const url = `${BASE_URL}/${fromCurrencyCode}/${toCurrencyCode}`;
      const response = await fetch(url);
      const data = await response.json();
      setRate(data.conversion_rate);
    }
  };

  useEffect(() => {
    convert();
  }, [fromCurrencyCode, toCurrencyCode]);

  useEffect(() => {
    setError(false);
  }, [amount]);

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
      className={`md:bg-background-image w-full md:h-dvh bg-no-repeat bg-cover flex items-center justify-center`}
    >
      <div className="w-full md:w-[85%] lg:w-[75%] xl:w-[60%] 2xl:w-[55%] bg-white md:rounded-[20px] md:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] py-5 md:py-10 px-5 md:px-14">
        <h1 className="text-2xl lg:text-3xl 2xl:text-4xl font-inter font-medium text-center md:text-start">
          Currency Converter
        </h1>

        <div className="mt-5">
          <label
            htmlFor="amount"
            className="inline-block mb-2 text-lg 2xl:text-xl font-inter"
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
            className="w-full border-2 border-[#dddddd] rounded-[6px] py-2 md:py-2.5 2xl:py-[15px] px-5 focus:outline-[#dddddd] font-inter text-base lg:text-lg text-[#0e0f43]"
          />
          {error && (
            <p className="text-[#ba0061] font-inter">
              Please enter an amount greater than 0
            </p>
          )}
        </div>

        <div className="md:flex items-center gap-5 mt-4 md:mt-6">
          <div className="w-full md:w-[47%] mb-2.5 md:mb-0">
            <p className="mb-1 md:mb-2 text-lg 2xl:text-xl font-inter">From</p>

            <div className="w-full border-2 border-[#dddddd] rounded-[6px] py-1 2xl:py-2 px-2.5 md:px-3 2xl:px-5 flex">
              <div className="box-content w-[40px] md:w-[50px] pr-4 xl:pr-5 relative after:absolute after:top-2/4 after:-translate-y-2/4 after:right-0 after:w-[2px] after:h-full after:bg-[#dddddd]">
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
                className="w-full px-2.5 2xl:px-3 font-inter text-lg md:text-xl 2xl:text-2xl text-[#0e0f43] outline-none"
              >
                {country.map((item, index) => (
                  <option
                    key={index}
                    value={item.currencyCode}
                    className="lg:text-xl"
                  >
                    {item.currencyCode}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full md:w-[6%] hidden md:flex items-center justify-center">
            <FaExchangeAlt
              onClick={exchange}
              className="text-2xl md:text-xl lg:text-2xl 2xl:text-[30px] mb-3 md:mb-0 mt-5 md:mt-8 cursor-pointer hover:scale-[1.2] transition-all duration-200 rotate-90 md:rotate-0"
            />
          </div>

          <div className="w-full md:w-[47%]">
            <p className="mb-1 md:mb-2 text-lg 2xl:text-xl font-inter">To</p>

            <div className="w-full border-2 border-[#dddddd] rounded-[6px] py-1 2xl:py-2 px-2.5 md:px-3 2xl:px-5 flex">
              <div className="box-content w-[40px] md:w-[50px] pr-4 2xl:pr-5 relative after:absolute after:top-2/4 after:-translate-y-2/4 after:right-0 after:w-[2px] after:h-full after:bg-[#dddddd]">
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
                className="w-full px-2.5 2xl:px-3 font-inter text-lg md:text-xl 2xl:text-2xl text-[#0e0f43] outline-none"
              >
                {country.map((item, index) => (
                  <option
                    key={index}
                    value={item.currencyCode}
                    className="md:text-xl"
                  >
                    {item.currencyCode}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="lg:flex items-end mt-7">
          <div className="w-full lg:w-[55%]">
            <div>
              <h3 className="text-xl 2xl:text-2xl font-inter text-[#5c667b] font-medium mb-1 lg:mb-3 break-all">
                {amount} {fromCurrencyCode} =
              </h3>
              <h3 className="text-[26px] 2xl:text-4xl font-inter text-[#2e3c57] font-medium">
                {parseInt(rate * amount)}.
                <span className="text-[#a1a6b0]">
                  {(rate * amount).toString().split(".")[1]}
                </span>{" "}
                {toCurrencyCode}{" "}
              </h3>
            </div>
          </div>

          <div className="w-full lg:w-[45%]">
            <button
              onClick={convert}
              className="w-full bg-[#80e142] text-[#163300] py-2.5 2xl:py-3 font-inter text-lg 2xl:text-xl font-medium rounded-[30px] transition-all duration-200 active:scale-[0.98] mt-0 md:mt-8"
            >
              Convert
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
