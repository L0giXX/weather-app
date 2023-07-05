import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";

async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

function App() {
  const [searchCity, setSearchCity] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
  const cityHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchData(url);
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
              className="bg-gray-900 px-4 py-2 w-auto h-10.5 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-700 active:bg-slate-700 active: outline-none active:ring-2 active:ring-blue-700"
              onClick={cityHandler}
            >
              Search
            </button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;
