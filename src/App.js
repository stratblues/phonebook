import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import './index.css'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'




const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState()
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {

    personService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })

  }, [])

  const deletePersonId = (id) => {
    const personObject = persons.filter(person => person.id === id)
    if (personObject) {

      const result = window.confirm(`Do you want to delete ${personObject[0].name}?`)
      if (result) {
        personService
          .destroy(id)
        setPersons(persons.filter(person => person.id !== personObject[0].id))


      }


    }


  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,

    }

    const existingPerson = persons.find(person => person.name === personObject.name)


    if (existingPerson) {
      const personId = existingPerson.id
      const newNumber = window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)
      if (newNumber) {
        const changedNumber = { ...personObject }
        personService
          .update(personId, changedNumber).then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personId ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(`${changedNumber.name} was already removed from the server!`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })




      }


    } else {

      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`You've added ${response.name} to the phonebook!`)
          setTimeout(() => {
            setSuccessMessage(null)

          }, 5000)

        })
        .catch(error => {
          console.log(error)
          setErrorMessage(error.data)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })


    }
  }




  const handleNameChange = (event) => {

    setNewName(event.target.value)

  }

  const handleNumberChange = (e) => {

    setNewNumber(e.target.value)
  }

  const handleChange = (e) => {
    setFilter(e.target.value)
  }





  return (
    <div>
      <h1>Phonebook</h1>



      <Notification message={successMessage} />
      <ErrorMessage message={errorMessage} />

      <Filter filter={filter} handleChange={handleChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>


      <Persons

        filter={filter}
        persons={persons}
        deletePerson={deletePersonId} />

    </div>
  )
}

export default App