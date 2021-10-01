import React, { useState, useEffect} from 'react'
import personsService from './services/persons'
import './index.css'

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
  const {personToShow,deleteOne} = props
  return (
    <div>
      {personToShow.map(person => 
        <div key={person.name}>{person.name} {person.number}  
          <button onClick={()=>{deleteOne(person)}}>delete</button>
        </div>)}
    </div>
  )
}
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="noti">
      {message}
    </div>
  )
}
const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName ] = useState('')
  const [phone, setPhone ] = useState('')
  const [nameToSearch, setNameToSearch] = useState('')
  const [notiMessage, setNotiMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handlePhoneChnage = (event) =>{
    setPhone(event.target.value)
  }

  const searchName = (event) =>{
    setNameToSearch(event.target.value.toLowerCase())
  }


  const addName = (event) =>{
    event.preventDefault()
    const person = persons.find(person => person.name === newName)
    const obj = {name:newName, number: phone}
    if (person){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personsService
        .update(person.id, obj)
        .then(data =>{
           showNotiMessage(`Added ${newName}`)
           updateUI()
        })
        .catch(error => {
          showErrorMessage(error.response.data.error)
          updateUI()
        })
      }
    }else{
      personsService
        .create(obj)
        .then(data =>{
          showNotiMessage(`Added ${newName}`)
          updateUI()
        })
        .catch(error => {
          showErrorMessage(error.response.data.error)
          console.log(error.response.data)
        })
    }
  }

  const deleteOne = (person) =>{
      if(window.confirm(`Delete ${person.name} ?`)){
        personsService
        .deleteOne(person.id)
        .then(data=>{
          updateUI()
        })
      }
  }

  const updateUI = ()=>{
    personsService
    .getAll()
    .then(data =>{
      console.log(data)
      setPersons(data)
    })
  }

  const showNotiMessage = (message)=>{
    setNotiMessage(message)
    setTimeout(() => {setNotiMessage(null)}, 5000)
  }

  const showErrorMessage = (message)=>{
    setErrorMessage(message)
    setTimeout(() => {setErrorMessage(null)}, 5000)
  }

  useEffect(()=>{
    updateUI()
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notiMessage}/>
      <ErrorNotification message={errorMessage}/>

      <Filter searchName={searchName}/>
      <h3>add a new</h3>
      <PersonForm addName={addName} newName={newName} phone={phone} handleNameChange={handleNameChange} handlePhoneChnage={handlePhoneChnage}/>
      <h2>Numbers</h2>
      <Persons personToShow={persons.filter(person=> person.name.toLowerCase().includes(nameToSearch))}
               deleteOne= {deleteOne}/>
    </div>
  )
}

export default App