import React, { useState, useEffect } from 'react'
import nameService from "./services/names"
import './index.css'

const Button = ({handleClick, text}) => (
  <button onClick ={handleClick}>{text}</button>
)

const HandleInput = ({newText, setTextChange}) => <input value = {newText} onChange={(event) => setTextChange(event.target.value)}/>

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="confirmation">
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [confirmMessage, setConfirmMessage] = useState(null)
  
  useEffect(() => nameService.getAll().then(initialNames => setPersons(initialNames)),[])
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const filteredNames =persons.filter(person => person.name === newName)
    const targetedName = filteredNames[0]
    
    
    filteredNames.length > 0 ? 
    targetedName.number !== newNumber ? 
    window.confirm(`${newName} is already added to phonebook, replace the old number with a new one? `) ?
    nameService.update(targetedName.id, nameObject ).then(returnedName =>{
      setPersons(persons.map(n => n.id !== targetedName.id ? n : returnedName ))
      setConfirmMessage(`Changed ${newName}'s number to ${newNumber}`)
      setTimeout(() =>{
        setConfirmMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber("")
    }).catch(error => {
      setConfirmMessage(`Information of ${newName} has already been removed from server`)
      setTimeout(() =>{
        setConfirmMessage(null)
      }, 5000)}) :
    console.log("Choosed no"):
    alert(`${newName} is already added to phonebook`):
    nameService.create(nameObject).then(returnedName =>{
      setPersons(persons.concat(returnedName))
      setConfirmMessage(`Added ${newName}`)
      setTimeout(() =>{
        setConfirmMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber("")
    }) 

  }

  const filteredNames = persons.filter(person => person.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1)
  const personsToShow = filteredNames.length > 0 ? filteredNames : persons

  const deleteName = id => {
    const person = persons.find(n => n.id === id)
    if(window.confirm(`Delete ${person.name} ?`))
    {nameService.deleteID(id).then(() => setPersons(persons.filter(n => n.id !== id))).catch(error => {
      setConfirmMessage(`Information of ${person.name} has already been removed from server`)
      setTimeout(() =>{
        setConfirmMessage(null)
      }, 5000)
    })}
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={confirmMessage} />
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
      <ul>
        {personsToShow.map(person => 
        <li key = {person.name}>
          {person.name} {person.number} 
          <Button text ="delete" handleClick = {() => deleteName(person.id)}/>
        </li>)}
      </ul>
    </div>
  )
}

export default App