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
        console.log(haveChildren)

        //Add equipments into arr from list of rooms id OR Add equipments into arr by id of selected room 
        let equipmentElements = [];
        if(childrenElemId && childrenElemId.length>0){
            for(let i = 0; i < childrenElemId.length; i++){
                equipments.map((item)=>{
                    if(item.room && item.room === childrenElemId[i]){
                        equipmentElements.push(item.name)
                }
            })
        } 
        } else {
            equipments.map((item)=>{
                if(item.room && item.room === this.props.equipmentRoom){
                    equipmentElements.push(item.name)
                }
            })
        }
        //
        
        let equipmentElement = equipmentElements.map((item)=>{
            return (
                   <div className='equipment'>
                        <p>{item}</p>
                        <button>delete</button>
                    </div>
                )
        })


        return(
               <div className={"right-sidebar"}>
                    <Buttons haveChildren = {haveChildren}/>
                    {equipmentElement}
               </div>
         )
    }
}


export default Equipments