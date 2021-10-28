import React from 'react'

const ErrorMessage = ({ message }) => {
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 16,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10

    }

    if (message === null) {

        return null

    } else

        return (

            <div style={errorStyle}>

                {message}
            </div>


        )

}



export default ErrorMessage