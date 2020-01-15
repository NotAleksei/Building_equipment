/* eslint no-undef: "off"*/
import React from 'react';
import classes from './AddEquipmentModal.module.css'


class AddEquipmentModal extends React.Component{

    state={
        equipmentName: '',
        count: '',
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


    addEquipment = (event) => {
        event.preventDefault();
        let equipmentName = this.state.equipmentName;
        if(equipmentName.trim() != '') {
            let comp = new Scorocode.Object("equipment");
            comp.set("name", this.state.equipmentName);
            comp.set("room", this.props.roomId); 
            comp.set("count", +this.state.count);
            comp.save().then(() => {
                console.info("Done");
                this.props.reloadEquipment()
            });
            this.setState({
                validation: true,
            })
            console.log(`добваили ${this.state.equipmentName} в количестве ${this.state.count} в команту ${this.props.roomId}`)

            this.props.showAddModal()
        } else {
            console.log('пустое поле')
            this.setState({
                validation: false,
            })
        }
    }
      
    render(){

        return(
           <div className={classes.AddEquipmentModal}>
            <form className={classes.modalWindow}> 
                <h1>добавить новое оборудование</h1>
                <input className={this.state.validation ? classes.inputName : classes.wrongName} placeholder='наименование оборудования' value={this.state.equipmentName} onChange={this.handleChangeName}></input>
                <input className={classes.inputCount}placeholder='колличество' value={this.state.count} onChange={this.handleChangeCount} type='number'></input>
                <div className={classes.modalButton}>
                    <button className ={classes.button} onClick={this.addEquipment}>сохранить</button>
                    <button className={classes.button} onClick={this.props.showAddModal}>отмена</button>
                </div>
            </form>
           </div> 
         )
    }
}




export default AddEquipmentModal