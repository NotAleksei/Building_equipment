import React from 'react'
import full from '../../../img/full.png'
import empty from '../../../img/empty.png'
import classes from './Indicator.module.css'


const Indicator = props  => {
    
    return(
            <img src={props.equipmentsList === 'full' ? full : empty} alt=''></img>
    )
}

export default Indicator