import { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import SearchForm from './components/SearchForm';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import Footer from './components/Footer';
import Design from "./components/Design";

function App() {
  const [locationData, setLocationData] = useState({
    place: "",
    feelslike: "",
    temp: "",
    sky: "",
    time: "",
    country: "",
    rain: "",
    icon: "",
  });
  const [forecast, setForecast] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [error, setError] = useState("");
  const [unitSystem, setUnitSystem] = useState("imperial"); // Fahrenheit

  const loadWeatherData = async (lat, lon) => {
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=971dd5760ffab6b29ef2381c02412126&units=imperial&lang=en`
      );
      if (!weatherRes.ok) throw new Error("City not found");

      const weatherData = await weatherRes.json();
      const { main, weather, sys, timezone, name } = weatherData;

      const currentTime = new Date(new Date().getTime() + timezone * 1000);
      const formattedTime = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }).format(currentTime);

      setLocationData({
        feelslike: main.feels_like,
        temp: main.temp,
        sky: weather[0]?.description,
        place: name,
        country: sys.country,
        rain: weather[0]?.main,
        icon: weather[0]?.icon,
        time: formattedTime,
        temp_min: main.temp_min,
        temp_max: main.temp_max,
      });

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=971dd5760ffab6b29ef2381c02412126&units=imperial&lang=en`
      );
      const forecastData = await forecastRes.json();
      const dailyForecast = forecastData.list.filter(item =>
        item.dt_txt.includes("12:00:00")
      );

      setForecast(dailyForecast);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      loadWeatherData(lat, lon);
    });
  }, []);

  const callApi = async (place) => {
    try {
      setButtonClicked(true);
      setError("");

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=971dd5760ffab6b29ef2381c02412126&units=imperial&lang=en`
      );
      if (!weatherRes.ok) throw new Error("City not found");

      const weatherData = await weatherRes.json();
      const { main, weather, sys, timezone, name } = weatherData;

      const currentTime = new Date(new Date().getTime() + timezone * 1000);
      const formattedTime = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }).format(currentTime);

      setLocationData({
        feelslike: main.feels_like,
        temp: main.temp,
        sky: weather[0]?.description,
        place: name,
        country: sys.country,
        rain: weather[0]?.main,
        icon: weather[0]?.icon,
        time: formattedTime,
        temp_min: main.temp_min,
        temp_max: main.temp_max,
      });

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=971dd5760ffab6b29ef2381c02412126&units=imperial&lang=en`
      );
      const forecastData = await forecastRes.json();
      const dailyForecast = forecastData.list.filter(item =>
        item.dt_txt.includes("12:00:00")
      );

      setForecast(dailyForecast);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  const handleSearchSubmit = (e, place) => {
    e.preventDefault();
    callApi(place);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-600 via-green-800 to-blue-900 text-white">
      <Design />
      <header className="text-center py-10">
        <h1 className="text-5xl font-extrabold">
          <Typewriter options={{ strings: ["Weather App"], autoStart: true, loop: true }} />
        </h1>
      </header>

      <main className="container mx-auto px-4 flex-grow">
        <SearchForm 
          onSearchSubmit={handleSearchSubmit}
          unitSystem={unitSystem}
          setUnitSystem={setUnitSystem}
        />

        {error && <div className="text-center text-red-500 mt-4">{error}</div>}

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="lg:w-1/2">
            {locationData.temp && !error && <WeatherCard weatherData={locationData} unitSystem={unitSystem} />}
          </div>

          <div className="lg:w-1/2">
            {forecast.length > 0 && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-center">5-Day Forecast</h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {forecast.map((day, index) => (
                    <ForecastCard key={index} forecast={day} unitSystem={unitSystem} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default App;