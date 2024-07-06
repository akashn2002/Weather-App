import logo from './logo.svg';
import './App.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeandLocation from "./components/TimeandLocation";
import TemperatureandDetails from "./components/TemperatureandDetails";
import formatForecastWeather from "./services/hourly_daily";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import Forecast from "./components/Forecast";

function App() {
  const [query, setQuery] = useState({ q: "New Delhi" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [weather2, setWeather2] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";
      toast.info("Fetching weather for " + message);
      await getFormattedWeatherData({ ...query, units }).then(async (data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );
        setWeather(data);
        const data2 = await formatForecastWeather(data.lat, data.lon);
        setWeather2(data2);
      });
    };

    fetchWeather();
  }, [query, units]);

  const { daily, hourly } = { ...weather2 };
  return (
    <>
    <div
      className="bg-cover bg-center bg-no-repeat grid p-6 md:p-10 lg:p-16"
      style={{
        backgroundImage: `url(${require("./Images/pexels-photo-1229042.jpg")})`,
      }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto py-6 px-4 md:px-8 lg:px-16 bg-white bg-opacity-5 backdrop-blur-lg rounded-lg drop-shadow-lg"
        id="form"
      >
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

        {weather && (
          <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
            <TimeandLocation weather={weather} />
            <TemperatureandDetails weather={weather} />
            <Forecast title="Hourly Forecast" items={hourly} />
            <Forecast title="Daily Forecast" items={daily} />
          </div>
        )}
      </div>
      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  </>
   
  );
}

export default App;
