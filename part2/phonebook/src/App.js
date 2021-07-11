import React, { useState } from 'react'


const Filter = (props) =>{
  return (
    <div>filter shown with <input onChange={props.searchName}/></div>
  )
}

const PersonForm = (props) =>{
  const {addName,newName,phone,handleNameChange,handlePhoneChnage} = props
  return (
    <form onSubmit={addName}>
    <div>name: <input value={newName} onChange={handleNameChange}/></div>
    <div>number: <input value={phone} onChange={handlePhoneChnage}/></div>
    <div><button type="submit">add</button></div>
  </form>
  )
}

const Persons =(props) =>{
  const personToShow = props.personToShow
  return (
    <div>
    {personToShow.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName ] = useState('')
  const [phone, setPhone ] = useState('')
  const [personToShow, setPersonToShow] = useState([...persons])

  const addName = (event) =>{
    event.preventDefault()
    if (persons.find(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }else{
      setPersons([...persons, {name: newName, number: phone}])
    }
  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handlePhoneChnage = (event) =>{
    setPhone(event.target.value)
  }

  const searchName = (event) =>{
    const nameToSearch = event.target.value.toLowerCase()
    setPersonToShow(persons.filter(person=> person.name.toLowerCase().includes(nameToSearch)))
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName}/>
      <h3>add a new</h3>
      <PersonForm addName={addName} newName={newName} phone={phone} handleNameChange={handleNameChange} handlePhoneChnage={handlePhoneChnage}/>
      <h2>Numbers</h2>
      <Persons personToShow={personToShow}/>
    </div>
  )
}

export default App