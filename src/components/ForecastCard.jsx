const ForecastCard = ({ forecast }) => {
  const { dt_txt, weather, main } = forecast;
  const date = new Date(dt_txt);
  const weatherCondition = weather[0]?.main.toLowerCase();

  const getCardColor = () => {
    switch (weatherCondition) {
      case "clear":
        return "bg-yellow-200"; 
      case "clouds":
        return "bg-gray-300"; 
      case "rain":
        return "bg-blue-300"; 
      case "snow":
        return "bg-white"; 
      case "storm":
        return "bg-indigo-300"; 
      default:
        return "bg-green-200"; 
    }
  };

  const getTextColor = () => {
    switch (weatherCondition) {
      case "clear":
        return "text-yellow-600"; 
      case "clouds":
        return "text-gray-700"; 
      case "rain":
        return "text-blue-800"; 
      case "snow":
        return "text-gray-800"; 
      case "storm":
        return "text-indigo-800"; 
      default:
        return "text-green-700"; 
    }
  };

  return (
    <div
      className={`w-48 p-4 rounded-lg shadow-md ${getCardColor()} hover:scale-103 transform transition-all duration-300 active:scale-110`}
    >
      <h3 className={`text-xl font-semibold ${getTextColor()} text-center`}>
        {date.toLocaleDateString("en-US", { weekday: "long" })}
      </h3>

      {/* Weather Icon */}
      <div className="my-2 flex justify-center">
        <img
          src={`https://openweathermap.org/img/wn/${weather[0]?.icon}.png`}
          alt={weather[0]?.description}
          className="w-16 h-16"
        />
      </div>

      {/* Weather Description */}
      <p className={`text-center text-sm ${getTextColor()}`}>
        {weather[0]?.description}
      </p>

      <div className="flex justify-between mt-2">
        <div className="text-center">
          <p className={`text-xs ${getTextColor()}`}>Temp</p>
          <h4 className={`text-xl font-semibold ${getTextColor()}`}>
            {Math.round(main.temp)}°
            {`F`}
          </h4>
        </div>

        <div className="text-center">
          <p className={`text-xs ${getTextColor()}`}>Feels Like</p>
          <h4 className={`text-xl font-semibold ${getTextColor()}`}>
            {Math.round(main.feels_like)}°
            {`F`}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;