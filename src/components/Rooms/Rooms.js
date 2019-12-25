/* eslint no-undef: "off"*/
import React from 'react';
import Indicator from '../UI/Indicator/Indicator'
import classes from './Rooms.module.css'

class Rooms extends React.Component{


    render(){
   
        const rooms = this.props.rooms;
        const roomsElement = rooms.map((item)=>{
            return (
            <li key={item.id}>
                <a id={item.id}  onClick ={()=>this.props.handleClick(item.id)}>{item.name}</a>
                {this.props.currentRoomId === item.id ? <Indicator equipmentsList = {this.props.equipmentsList}/> : null}
                {(item.children) && (
                <Rooms 
                    rooms={item.children} 
                    handleClick = {this.props.handleClick} 
                    currentRoomId = {this.props.currentRoomId} 
                    equipmentsList = {this.props.equipmentsList}
                />)}
            </li>
            )
        });

        return(
            <ul className={classes.list}>
                {roomsElement}
            </ul>
         )
    }

}



export default Rooms