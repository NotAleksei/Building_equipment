/* eslint no-undef: "off"*/
import React from 'react'
import classes from './DeleteButton.module.css'



const DeleteButton = props  => {
    
    const deleteEquipment = () => {
        let equip = new Scorocode.Object("equipment");
        equip.getById(props.id).then((item) => {
            equip.remove(item).then(() => {
                console.info("Done");
                props.reloadEquipment()
            });
        });
    }

    return(
        <button className = {classes.DeleteButton} onClick = {deleteEquipment}>delete</button>
    )
}

export default DeleteButton