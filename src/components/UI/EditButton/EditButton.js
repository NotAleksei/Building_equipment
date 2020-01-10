import React from 'react'
import editPng from '../../../img/edit.png'
import classes from './EditButton.module.css'



const EditButton = props  => {
   

    const currentItem = props.currentItem;

    return(
        <button className = {classes.EditButton}
            onClick = {()=>props.showEditModal(currentItem.id, currentItem.name, currentItem.count)}
            ><img src={editPng} alt=''></img>
        </button>
    )
}

export default EditButton