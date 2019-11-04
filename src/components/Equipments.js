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
   
        
        let equipmentElement = equipmentElements.map((item, idx)=>{
            return (
                   <tr className='equipment' key={elementId[idx]} id={elementId[idx]}>
                        <td>{item}</td>
                        <td>{count[idx]}</td>
                        <td>
                            <button className = 'editButton'>edit</button>
                            <button className = 'deleteButton'>delete</button>
                        </td>
                    </tr>
                )
        })


        return(
               <div className='equipment-table'>
                   <table>
                          {equipmentElements.length > 0 && equipmentElement}
                    </table>
                    <Buttons haveChildren = {haveChildren}/>
               </div>
         )
    }
}


export default Equipments