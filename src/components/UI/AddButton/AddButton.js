/* eslint no-undef: "off"*/
import React from 'react'
import classes from './AddButton.module.css'



const AddButton = props  => {
    
    return(
        <button className = {classes.AddButton} onClick = {props.showAddModal}>add</button>
    )
}

export default AddButton