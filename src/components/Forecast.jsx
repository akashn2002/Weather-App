import React from "react";
import { iconUrlFromCode } from "../services/weatherService";

function Forecast({ title, items }) {
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>

      <hr className="my-2" />

      <div className="flex flex-row items-center justify-between text-white">
        {items?.map((item, index) => {
          let content;
          if (title === "Hourly Forecast") {
            content = (
              <div key={index} className="flex flex-col items-center justify-center">
                <p className="font-light text-sm">{item.title.slice(11, 16)}</p>
                <img src={iconUrlFromCode(item.icon)} className="w-12 my-1" alt="Weather Icon" />
                <p className="font-medium">{`${Math.round(item.temp - 273)}°`}</p>
              </div>
            );
          } else {
            const month = new Date(item.title).toLocaleString('en-US', { month: 'short' });
            content = (
              <div key={index} className="flex flex-col items-center justify-center">
                <p className="font-light text-sm">{`${item.title.slice(8, 10)} ${month}`}</p>
                <img src={iconUrlFromCode(item.icon)} className="w-12 my-1" alt="Weather Icon" />
                <p className="font-medium">{`${Math.round(item.temp - 273)}°`}</p>
              </div>
            );
          }
          return content;
        })}
      </div>
    </div>
  );
}

export default Forecast;
