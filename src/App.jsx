import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'
function App() {
  const [place, setPlace] = useState("")
  const [feelslike, setfeelslike] = useState("")
  const [temp, setTemp] = useState("")
  const [sky, setSky] = useState("")
  const [time, setTime] = useState("")



 
  const callApi=()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=971dd5760ffab6b29ef2381c02412126&units=metric&lang=en`)
    .then((e)=>{
      return e.json();

    })
    .then(async (data)=>{
       console.log(data)
       setfeelslike(data.main.feels_like);
       setSky(data.weather[0].description);
       setTemp(data.main.temp);

       function calcTime(city, timezone) {
        
        var d = new Date();
        //console.log(d)
        
        var utc = d.getTime() + (d.getTimezoneOffset()*60*1000);
    //console.log((d.getTimezonetimezone()))
        
        var nd = new Date(utc + (1000*timezone));
    
        setTime(nd.toLocaleString());
        return "The local time for city " + city +" is "+ nd.toLocaleString();
    }
    console.log(calcTime(place, data.timezone))
    })
  }
    const submittedForSearch=(e)=>{
      e.preventDefault();
      console.log("submitted")
      return callApi();
    }
  
    const changed=(e)=>{
      setPlace(e.target.value);
      
    }

  return (
      <>
        <div className='mainBackground'>
          <h1></h1>
          <form onSubmit={submittedForSearch} >
          

            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={changed}/>
            <button className="btn btn-success" type="submit">Search</button>
          </form>
        </div>
        {temp &&
<>
<div className="card text-center mb-3 text-warning" >
  <div className="card-body">
    <h1 className="card-title text-danger">{place.toUpperCase()}</h1>

    <div className="card-body">
    
    <div className="card-text"> <h2>{time}</h2></div>
    
    
  </div>


    <div className="card-text">Feels Like:<br/> <h2> {feelslike}</h2> <h1>&deg;C</h1> </div>
    
  </div>
  <div className="card-body">
    
    <div className="card-text">Temperature:<br/> <h2>{temp}</h2>  <h1>&deg;C</h1> </div>
    
  </div>
  <div className="card-body">
    
    <div className="card-text"> {sky}</div>
    
    
  </div>
</div> 


        
</>
}
      </>
   
  )
}

export default App
