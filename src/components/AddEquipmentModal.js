/* eslint no-undef: "off"*/
import React from 'react';


class AddEquipmentModal extends React.Component{


    render(){

        return(
           <div className='editEquipment'>
               <input placeholder='equipment name' className='equipmentInput-name'></input>
               <input placeholder='count' className='equipmentInput-count' type='number'></input>
               <div className='modalButton'>
                    <button className ='saveButton'>save</button>
                    <button className='cancelButton'>cancel</button>
                </div>
           </div> 
         )
    }
}




export default AddEquipmentModal