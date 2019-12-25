/* eslint no-undef: "off"*/
import React from 'react';
import classes from './EditEquipmentModal.module.css'


class EditEquipmentModal extends React.Component{

    state={
        id: this.props.currentItem.id,
        equipmentName: this.props.currentItem.name,
        count: this.props.currentItem.count,
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

    editEquipment = () => {
        let equip = new Scorocode.Object("equipment");
        equip.set("_id", this.state.id).set("name", this.state.name). set("count", +this.state.count);
        equip.save().then(() => {
            console.info("done")
            this.props.reloadEquipment()
        });
        console.log(`добваили ${this.state.equipmentName} в количестве ${this.state.count} с айди ${this.state.id}`)
        

        this.props.showEditModal()
    }
      
    render(){

        return(
           <div className={classes.AddEquipmentModal}>
            <form className={classes.modalWindow}> 
                <input placeholder='equipment name' value={this.state.equipmentName} onChange={this.handleChangeName}></input>
                <input placeholder='count' value={this.state.count} onChange={this.handleChangeCount} type='number'></input>
                <div className='modalButton'>
                    <button className ='saveButton' onClick={this.editEquipment}>save</button>
                    <button className='cancelButton' onClick={this.props.showEditModal}>cancel</button>
                </div>
            </form>
           </div> 
         )
    }
}




export default EditEquipmentModal