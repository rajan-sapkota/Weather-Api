const WeatherCard = ({ weatherData }) => {
    // Always use Fahrenheit as the unit
    const tempUnit = "°F";
    const feelsLikeUnit = "°F";
  
    // Function to determine the background and text color classes based on temperature
    const getStyles = (temp) => {
      if (temp <= 32) {
        return {
          bgClass: "bg-blue-400",
          textClass: "text-white",
          smallBoxBgClass: "bg-blue-300",
        }; // Cold
      } else if (temp > 32 && temp <= 68) {
        return {
          bgClass: "bg-yellow-200",
          textClass: "text-gray-800",
          smallBoxBgClass: "bg-yellow-100",
        }; // Mild
      } else if (temp > 68 && temp <= 86) {
        return {
          bgClass: "bg-orange-300",
          textClass: "text-gray-800",
          smallBoxBgClass: "bg-orange-200",
        }; // Warm
      } else {
        return {
          bgClass: "bg-red-500",
          textClass: "text-white",
          smallBoxBgClass: "bg-red-400",
        }; // Hot
      }
    };
  
    // Get the appropriate styles
    const { bgClass, textClass, smallBoxBgClass } = getStyles(weatherData.temp);
  
    return (
      <section
        className={`mt-10 max-w-md mx-auto p-8 rounded-xl shadow-lg hover:scale-105 transform transition-transform ${bgClass} ${textClass}`}
      >
        {/* City Name & Country */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-2">
            {weatherData.place.toUpperCase()}, {weatherData.country}
          </h2>
          <p className="text-xl">{weatherData.time}</p>
        </div>
  
        {/* Weather Icon */}
        <div className="my-6 flex justify-center">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
            alt={weatherData.sky}
            className="w-24 h-24"
          />
        </div>
  
        {/* Temperature & Feels Like */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Feels Like */}
          <div
            className={`text-center p-4 rounded-lg shadow-md ${smallBoxBgClass} ${textClass}`}
          >
            <p className="text-lg font-semibold">Feels Like</p>
            <h3 className="text-3xl font-bold">
              {Math.round(weatherData.feelslike)}{feelsLikeUnit}
            </h3>
          </div>
  
          {/* Temperature */}
          <div
            className={`text-center p-4 rounded-lg shadow-md ${smallBoxBgClass} ${textClass}`}
          >
            <p className="text-lg font-semibold">Temperature</p>
            <h3 className="text-3xl font-bold">
              {Math.round(weatherData.temp)}{tempUnit}
            </h3>
          </div>
        </div>
  
        {/* Rain and Weather Description */}
        <div className="mt-6 text-center">
          <p className="text-lg">
            {weatherData.rain}: {weatherData.sky}
          </p>
        </div>
      </section>
    );
  };
  
  export default WeatherCard;