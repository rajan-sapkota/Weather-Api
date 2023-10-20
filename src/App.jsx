import { useState } from "react";

import "./App.css";
import { useEffect } from "react";
import Typewriter from "typewriter-effect/";

function App() {
  const [place, setPlace] = useState("");
  const [feelslike, setfeelslike] = useState("");
  const [temp, setTemp] = useState("");
  const [sky, setSky] = useState("");
  const [time, setTime] = useState("");
  const [country, setCountry] = useState("");
  const [rain, setRain] = useState("");


  useEffect(() => {
    console.log("Coords api calling...");
    if (!place) {
      const loadFirst = async (lat, long) => {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=971dd5760ffab6b29ef2381c02412126&units=metric&lang=en`,
        );
        const data = await res.json();
        console.log(data);
        setfeelslike(data.main.feels_like);
        setSky(data.weather[0].description);
        setTemp(data.main.temp);
        setPlace(data.name);
        setCountry(data.sys.country);
        setRain(data.weather[0].main);
        
        
        var d = new Date();

        var utc = d.getTime() + d.getTimezoneOffset() * 60 * 1000;

        var nd = new Date(utc + 1000 * data.timezone);
        console.log(nd);
        setTime(nd.toLocaleString());
      };
      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        loadFirst(lat, lon);
      });
    }
  }, []);

  const callApi = () => {
    console.log("Place api calling");
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=971dd5760ffab6b29ef2381c02412126&units=metric&lang=en`,
    )
      .then(e => {
        return e.json();
      })
      .then(async data => {
        console.log(data);
        setfeelslike(data.main.feels_like);
        setSky(data.weather[0].description);
        setTemp(data.main.temp);
        setCountry(data.sys.country);
        setRain(data.weather[0].main);

       


        function calcTime(city, timezone) {
          var d = new Date();

          var utc = d.getTime() + d.getTimezoneOffset() * 60 * 1000;

          var nd = new Date(utc + 1000 * timezone);

          setTime(nd.toLocaleString());
          return (
            "The local time for city " + city + " is " + nd.toLocaleString()
          );
        }
        console.log(calcTime(place, data.timezone));
      });
  };
  const submittedForSearch = e => {
    e.preventDefault();
    console.log("submitted");
    return callApi();
  };

  const changed = e => {
    setPlace(e.target.value);
  };

  
  
  return (
    <>
    

      
        <h1 id='type'>
          <Typewriter
            options={{
              strings: ["Weather App"],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
      

      <div id='mainBackground'>
        
        <form onSubmit={submittedForSearch}>
          <input
            className='form-control me-2'
            type='search'
            placeholder='Search City or Country'
            aria-label='Search'
            onChange={changed}
          />
          <button className='btn btn-success' type='submit'>
            Search
          </button>
        </form>
      
      {temp && (
        <>
          <div className='text-center mb-3 text-primary'>
              <h1 className='text-danger m-3'>{place.toUpperCase()+", "+ country}</h1>

                  <div className='m-3'>
                  {" "}
                  <h2>{time}</h2>
                </div>
              

              <div >
                Feels Like:
                <br /> <h2> {feelslike}</h2> <h1>&deg;C</h1>{" "}
              </div>
            
              <div>
                Temperature:
                <br /> <h2>{temp}</h2> <h1>&deg;C</h1>{" "}
              </div>
            
            <div >
              <div> {rain+": "+ sky}</div>
            </div>
            </div>
        </>
      )}
<div className="footer" >
&copy; 2023 RAJAN SAPKOTA <br/>
rajan.sa9841@gmail.com | 
<a href = "mailto: rajan.sa9841@gmail.com">Send Email</a>
        </div>
        </div>
       
    </>
    
  );
}

export default App;
