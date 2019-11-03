/* eslint no-undef: "off"*/
import React from 'react';
import Buttons from './Buttons';


class Equipments extends React.Component{
    

    
    render(){
        const equipments = this.props.equipments;
        const childrenElemId = this.props.childrenElemId
        let haveChildren;
        
        if(childrenElemId && childrenElemId.length > 0) {
            haveChildren = false;
        } else if(childrenElemId){
            haveChildren = true;
        }


        //Add equipments into arr from list of rooms id OR Add equipments into arr by id of selected room 
        let equipmentElements = [];
        let elementId = [];
        let count = []
        if(childrenElemId && childrenElemId.length>0){
            for(let i = 0; i < childrenElemId.length; i++){
                equipments.map((item)=>{
                    if(item.room && item.room === childrenElemId[i]){
                        equipmentElements.push(item.name)
                        elementId.push(item._id)
                        count.push(item.count)
                }
            })
             } 
        } else {
            equipments.map((item)=>{
                if(item.room && item.room === this.props.equipmentRoom){
                    equipmentElements.push(item.name)
                    elementId.push(item._id)
                    count.push(item.count)
                }
            })
        }
        //
        
        let equipmentElement = equipmentElements.map((item, idx)=>{
            return (
                   <div className='equipment' key={elementId[idx]} id={elementId[idx]}>
                        <p>{item}:{count[idx]}</p>
                        <button className = 'editButton'>edit</button>
                        <button className = 'deleteButton'>delete</button>
                    </div>
                )
        })


        return(
               <div className={"right-sidebar"}>
                    {equipmentElement}
                    <Buttons haveChildren = {haveChildren}/>
               </div>
         )
    }
}


export default Equipments