import React, { useState, useEffect} from 'react'
import axios from 'axios'

const API_URL = "https://restcountries.eu/rest/v2/all"


const Country = (props)=>{
  const {countryList, setSearchCritea, weather} = props
  
  if(countryList.length>10){
    return (
      <div>Too many matchs, specify another filter</div>)
      
  }else if(countryList.length>1){
    return (
      countryList
        .map(country => (
          <div key={country.name}>
            {country.name} <button onClick={()=> setSearchCritea(country.name)}>show</button>
          </div>
        )))
  }else if(countryList.length==1){
    
    const country = countryList[0]
    return (<SingleCountry country={countryList[0]} 
                           weather= {weather}
                           />)
  }

  return (<div></div>)
}

const SingleCountry= (props) => {
  const {country,weather} = props

  const curWeather = weather.current? weather.current: {}
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages
          .map(lang=>(
            <li key = {lang.name}>{lang.name}</li>
          ))}
      </ul>
      <img src={country.flag} width="130"/>

      <h2>Weather in {country.capital}</h2>
      <div><b>temperature:</b> {curWeather.temperature} Celcius</div>
      { curWeather.weather_icons? curWeather.weather_icons.map((icon,index) =>(
        <img key={index} src={icon} width="70"/>
       )) : <div></div>}
      <div><b>wind:</b> {curWeather.wind_speed} mph direction {curWeather.wind_dir}</div>

    </div>
  )
}




function App() {
  const [countries, setCountries] = useState([]);
  const [searchCritea,  setSearchCritea] = useState('');
  const [weather, setWeather] = useState({});

  useEffect(()=>{
    axios
    .get(API_URL)
    .then(response => {
      setCountries(response.data)
    })
  }, [])


  useEffect(()=>{
    const country = filterList.length==1? filterList[0] : null 
    if(country != null){
      axios
      .get("http://api.weatherstack.com/current", {
        params: {
          access_key: "0ff0b34f06667008198a23aefaa4e193",
          query:country.capital+','+country.country
        }
      })
      .then(response => {
        setWeather(response.data)
      })
    }
  }, [searchCritea])
  
  useEffect(()=>{

  })

  const searchCountries = (event) => {
    setSearchCritea(event.target.value);
  }

  const filterList = countries.filter(country => 
                        country.name.toLowerCase().includes(searchCritea.toLowerCase()))
  // persons.filter(person=> person.name.toLowerCase().includes(nameToSearch))
  return (
    <div>
      <div>found countries<input onChange={searchCountries}/></div>
      
      <Country 
          countryList= {filterList}
          setSearchCritea = {setSearchCritea}
          weather= {weather}
          />
    </div>
  );
}

export default App;
