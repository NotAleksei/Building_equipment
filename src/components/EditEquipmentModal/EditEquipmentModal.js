/* eslint no-undef: "off"*/
import React from 'react';
import classes from './EditEquipmentModal.module.css'


class EditEquipmentModal extends React.Component{

    state={
        id: this.props.currentItem.id,
        equipmentName: this.props.currentItem.name,
        count: this.props.currentItem.count,
        validation: true,
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

    editEquipment = (event) => {
        event.preventDefault();
        let equipmentName = this.state.equipmentName;
        if(equipmentName.trim() != ''){
            let equip = new Scorocode.Object("equipment");
            equip.set("_id", this.state.id).set("name", this.state.name). set("count", +this.state.count);
            equip.save().then(() => {
                console.info("done")
                this.props.reloadEquipment()
            });
            console.log(`добваили ${this.state.equipmentName} в количестве ${this.state.count} с айди ${this.state.id}`)
            this.props.showEditModal()
        } else {
            this.setState({
                validation: false,
            })
        }
    }
      
    render(){

        return(
           <div className={classes.AddEquipmentModal}>
            <form className={classes.modalWindow}> 
                <h1>редактировать оборудование</h1>
                <input className={this.state.validation ? classes.inputName : classes.wrongName} placeholder='наименование оборудования' value={this.state.equipmentName} onChange={this.handleChangeName}></input>
                <input className={classes.inputCount} placeholder='количество' value={this.state.count} onChange={this.handleChangeCount} type='number'></input>
                <div className={classes.modalButton}>
                    <button className ={classes.button} onClick={this.editEquipment}>save</button>
                    <button className ={classes.button} onClick={this.props.showEditModal}>cancel</button>
                </div>
            </form>
           </div> 
         )
    }
}




export default EditEquipmentModal