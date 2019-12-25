/* eslint no-undef: "off"*/
import React from 'react';
import classes from './AddEquipmentModal.module.css'


class AddEquipmentModal extends React.Component{

    state={
        equipmentName: '',
        count: '',
    }


    handleChangeName = (event) => {
        this.setState({
            equipmentName: event.target.value
        });
    }
    handleChangeCount = (event) => {
        this.setState({
            count: event.target.value
        });
    }

    addEquipment = () => {
        let comp = new Scorocode.Object("equipment");
        comp.set("name", this.state.equipmentName);
        comp.set("room", this.props.roomId); 
        comp.set("count", +this.state.count);
        comp.save().then(() => {
            console.info("Done");
            this.props.reloadEquipment()
        });
        console.log(`добваили ${this.state.equipmentName} в количестве ${this.state.count} в команту ${this.props.roomId}`)

        this.props.showAddModal()
    }
      
    render(){

        return(
           <div className={classes.AddEquipmentModal}>
            <form className={classes.modalWindow}> 
                <input placeholder='equipment name' value={this.state.equipmentName} onChange={this.handleChangeName}></input>
                <input placeholder='count' value={this.state.count} onChange={this.handleChangeCount} type='number'></input>
                <div className='modalButton'>
                    <button className ='saveButton' onClick={this.addEquipment}>save</button>
                    <button className='cancelButton' onClick={this.props.showAddModal}>cancel</button>
                </div>
            </form>
           </div> 
         )
    }
}




export default AddEquipmentModal