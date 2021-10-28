import React from 'react'


const Filter = ({ filter, handleChange }) => {



    return (
        <>
            filter shown with
            <input id="filter"
                value={filter}
                onChange={handleChange}
                type="text"
                name="filter" />

        </>
    )
}



export default Filter