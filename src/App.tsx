import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import {
  WiCloudy,
  WiThunderstorm,
  WiRain,
  WiSnow,
  WiDaySunny,
  WiFog,
} from "react-icons/wi";

async function fetchData(url: string) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function App() {
  const [searchCity, setSearchCity] = useState("");
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [weatherType, setWeatherType] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

  const cityHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const data = fetchData(url);
      const { main, name, weather } = await data;
      const { temp } = main;
      const { main: weatherType } = weather[0];
      setCity(name);
      setTemp(temp);
      setWeatherType(weatherType);
    } catch (err) {
      alert("City not found");
    }
  };
  const renderWeatherIcon = () => {
    switch (weatherType) {
      case "Clouds":
        return <WiCloudy className="h-20 w-20" />;
      case "Thunderstorm":
        return <WiThunderstorm className="h-20 w-20" />;
      case "Rain || Drizzle":
        return <WiRain className="h-20 w-20" />;
      case "Snow":
        return <WiSnow className="h-20 w-20" />;
      case "Clear":
        return <WiDaySunny className="h-20 w-20" />;
      case "Fog":
        return <WiFog className="h-20 w-20" />;
      default:
        return null;
    }
  };
  return (
    <div className="App">
      <header className="text-center mt-6">
        <h1 className="text-5xl font-semibold">Weather App</h1>
        <form>
          <div className="flex items-center w-full justify-center mt-8 gap-2">
            <div className="flex items-center bg-gray-900 rounded-md">
              <SearchIcon className="h-10 w-auto p-1 text-gray-400 " />
              <input
                type="text"
                name="searchCity"
                placeholder="Search for your city"
                className="px-2 py-2 w-96 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-700 rounded-r-md"
                onChange={(e) => setSearchCity(e.target.value)}
              />
            </div>
            <button
              className="bg-gray-900 px-4 py-2 w-auto h-10 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-700 active:bg-slate-700 active: outline-none active:ring-2 active:ring-blue-700"
              onClick={cityHandler}
            >
              Search
            </button>
          </div>
        </form>
      </header>
      <div className="flex justify-center mt-32 text-3xl">
        {city.length > 0 && (
          <div className="text-center bg-gray-900 p-6 rounded-md">
            <div className="py-2">{city}</div>
            <div className="py-2">{temp} °C</div>
            <div className="flex justify-center">{renderWeatherIcon()}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
