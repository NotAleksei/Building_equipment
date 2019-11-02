/* eslint no-undef: "off"*/
import React from 'react';
import Rooms from './Rooms';

class Buildings extends React.Component{
    render(){
        const buildings = this.props.buildings;
        const buildingsElement = buildings.map((item)=>{
            return (
            <li  key={item._id}>
                <a id={item._id}>{item.name}</a>
                <Rooms rooms={item.rooms} visibility = {this.props.visibility}/>
            </li>
            )
        })
        return(
            <div className={"left-sidebar"}>
                <ul>
                    {buildingsElement}
                </ul>
            </div>
         )
    }
}

export default Buildings