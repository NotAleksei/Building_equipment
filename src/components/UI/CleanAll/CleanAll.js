/* eslint no-undef: "off"*/
import React from 'react'
import classes from './DeleteButton.module.css'



const CleanAll = props  => {
    
    const deleteEquipment = () => {
        props.equipments.map((item)=>{
            if(item.room.indexOf('b1') != 0 || item.room.indexOf('b2') != 0 ){
            let equip = new Scorocode.Object("equipment");
            equip.getById(item._id).then((item) => {
                equip.remove(item).then(() => {
                    console.info("Done");
                });
            });
            }
        })

    }

    return(
        <button className = {classes.DeleteButton} onClick = {deleteEquipment}>CleanAll</button>
    )
}

export default CleanAll