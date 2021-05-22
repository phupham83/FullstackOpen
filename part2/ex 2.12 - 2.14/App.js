import React, { useState, useEffect } from 'react'
import axios from "axios"
const DisplayLanguages = ({countriesToShow}) => <ul>{countriesToShow.map(country => <li key = {country.name}>{country.name}</li>)}</ul>


const DisplayDetail = ({countriesToShow}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const tempURL = "http://api.weatherstack.com/current?access_key=" + api_key
  const [temp, setTemp] = useState({"current" : {"temperature" : 0, "wind_speed":0, "wind_dir":0, "weather_icons": "0"}})
  useEffect(() => {axios.get(tempURL+ "&query=" +countriesToShow[0].capital).then(response => setTemp(response.data))},[])
  
  console.log(api_key)

  return (
    <div>
      <h2>{countriesToShow[0].name}</h2>
      <li>capital {countriesToShow[0].capital}</li>
      <li>population {countriesToShow[0].population}</li>
      <h1>Spoken languages</h1>
      <DisplayLanguages countriesToShow = {countriesToShow[0].languages}/>
      <img src = {countriesToShow[0].flag} alt = "National flag" width="200" height="300"/>
      <h1>Weather in {countriesToShow[0].name}</h1>
      <p><b>temperature: </b> {temp.current.temperature} Celcius </p>
      <img src = {temp.current.weather_icons} alt="Weather icon"/>
      <p><b>wind:</b> {temp.current.wind_speed} mph direction {temp.current.wind_dir}</p> 
    </div>
  )
}
const DisplayAll = ({countriesToShow, setSearchName}) => <ul>{countriesToShow.map(country => <li key = {country.name}>{country.name}<button onClick = {() => setSearchName(country.name)} > show</button></li>)}</ul>

const Display = ({countriesToShow, setSearchName, api_key}) => {
  return (countriesToShow.length > 10 ? <div>Too many matches, specify another filter</div> :
    countriesToShow.length > 1 ? <DisplayAll countriesToShow={countriesToShow} setSearchName ={setSearchName}/> :
    countriesToShow.length === 1 ?  <DisplayDetail countriesToShow = {countriesToShow}/> : 
    <p>No matches</p>
  )}
const HandleInput = ({newText, setTextChange}) => <input value = {newText} onChange={(event) => setTextChange(event.target.value)}/>

const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ searchName, setSearchName ] = useState('')
  
  useEffect(()=>{axios.get('https://restcountries.eu/rest/v2/all').then(response => {setCountries(response.data)})},[])

  const countriesToShow = countries.filter(country => country.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1)
  
  return (
    <div>
      <form>
        find countries <HandleInput newText = {searchName} setTextChange ={setSearchName}/>
      </form>
      <Display countriesToShow={countriesToShow} setSearchName ={setSearchName}/>
    </div>
  )
}

export default App