/* eslint no-undef: "off"*/
import React from 'react';

class Rooms extends React.Component{


    render(){
   
        const rooms = this.props.rooms;
        const roomsElement = rooms.map((item)=>{
            return (
            <li key={item.id}>
            <a id={item.id}  onClick ={()=>this.props.handleClick(item.id)}>{item.name}</a>
            {(item.children) && (
            <Rooms 
                rooms={item.children} 
                handleClick ={this.props.handleClick}  
            />)}
            </li>
            )
        });

        return(
            <ul className='category-list'>
                {roomsElement}
            </ul>
         )
    }

}



export default Rooms