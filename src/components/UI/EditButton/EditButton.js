import React from 'react'
import classes from './EditButton.module.css'



const EditButton = props  => {
   

    const currentItem = props.currentItem;

    return(
        <button className = {classes.EditButton}
            onClick = {()=>props.showEditModal(currentItem.id, currentItem.name, currentItem.count)}
            >edit
        </button>
    )
}

export default EditButton