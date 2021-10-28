import React from 'react'



const Persons = ({ filter, persons, deletePerson }) => {





    return (
        persons.filter(f => f.name.includes(filter) || filter === '')
            .map(f =>
                <li key={f.id}> {f.name} {f.number}
                    <button onClick={() => deletePerson(f.id)}>delete</button>
                </li>)
    )
}


export default Persons