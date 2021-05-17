import React, { useState, useEffect } from 'react'
import axios from "axios"
const DisplayDetail = ({personsToShow}) => <ul>{personsToShow.map(person => <li key = {person.name}>{person.name} {person.number}</li>)}</ul>

const HandleInput = ({newText, setTextChange}) => <input value = {newText} onChange={(event) => setTextChange(event.target.value)}/>

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  
  useEffect(()=>{axios.get('http://localhost:3001/persons').then(response => {setPersons(response.data)})})
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    persons.filter(person => person.name === newName).length > 0 ? alert(`${newName} is already added to phonebook`) : 
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber("")
  }

  const filteredNames = persons.filter(person => person.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1)
  const personsToShow = filteredNames.length > 0 ? filteredNames : persons
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <HandleInput newText ={searchName} setTextChange ={setSearchName}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <HandleInput newText = {newName} setTextChange = {setNewName}/>
        </div>
        <div>number: <HandleInput newText ={newNumber} setTextChange ={setNewNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <DisplayDetail personsToShow ={personsToShow}/>
    </div>
  )
}

export default App