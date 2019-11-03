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
                {/* <span className='hidden'>тут есть</span> */}
                <Rooms rooms={item.rooms}/>
            </li>
            )
        })
        return(
            <div className="left-sidebar">
                <ul className='category-list'>
                    {buildingsElement}
                </ul>
            </div>
         )
    }
}

export default Buildings