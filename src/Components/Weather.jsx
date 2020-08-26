import React, { Fragment, useEffect, useState } from'react';
import axios from 'axios';
import apiKey from '../Conf';
import './Weather.css';

function Weather (){
  const[name, setName] = useState('');
  const[icon, setIcon] = useState('');
  const[iconDescrib, setIconDescrib] = useState('');
  const[temp, setTemp] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`)
      .then((response) => {
        setName(response.data.name);
        setIcon(response.data.weather[0].icon);
        setIconDescrib(response.data.weather[0].description);
        setTemp(response.data.main.temp);
      })
    })
  });
  return(
    <Fragment>
      <h1>Météo du jour</h1>
        <div class="card">
          <div class="card-body">
            <p className="city">{name}</p>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={iconDescrib} />
            <p>{Math.round(temp)}°C</p>
          </div>
        </div>      
    </Fragment>
  )  
}

export default Weather;