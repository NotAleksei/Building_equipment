/* eslint no-undef: "off"*/
import React from 'react';
import Buildings from './Buildings';
import Equipments from './Equipments';
import AddEquipmentModal from './AddEquipmentModal'

class App extends React.Component{

state = {
  StateBuldings: [],
  StateEquipments: [],
  equipmentRoom: undefined,
  childrenElemId: undefined,
  editEquipment: false,
  equipmentId: undefined,
}

componentDidMount(){
    
    let buildings = new Scorocode.Query("buildings");
    buildings.find().then((finded) => {
      let buildings = finded.result;
      this.setState({
        StateBuldings: buildings,
      })
    
    let eq = new Scorocode.Query("equipment");
    eq.find().then((found) => {
      let equipment = found.result;
      this.setState({
        StateEquipments: equipment,
      })
    });

  });
};

handleClick = (e) =>{
  if (e.target.tagName === 'A'){
  let childrenLi = e.target.parentNode.querySelectorAll('li')
  let childrenElemId = []
  for(let i = 0; i < childrenLi.length; i++){
    childrenElemId[i] = childrenLi[i].firstChild.id
  }
  let room = e.target.id;

  this.setState({
    childrenElemId: childrenElemId,
    equipmentRoom: room,
  })
  
}
};


cancelModal = () => {
    document.querySelector('.addEquipment-modal-active').classList.toggle('addEquipment-modal-active')
    this.setState({
      editEquipment: false,
    })
};

saveEquipment = (e) => {
  if(e.target.classList.contains('saveButton') && this.state.editEquipment){
    
    let equipmentName = document.querySelector('.equipmentInput-name').value;
    let equipmentCount = +document.querySelector('.equipmentInput-count').value;
    let equipmentId = this.state.equipmentId;

    this.cancelModal();
    //edit new equipment and rerender <Equipments/>
    let equip = new Scorocode.Object("equipment");
    
    equip.set("_id", equipmentId).set("name", equipmentName). set("count", equipmentCount);
    equip.save().then(() => {
      let eq = new Scorocode.Query("equipment");
      eq.find().then((found) => {
        let equipment = found.result;
        this.setState({
          StateEquipments: equipment,
        })
      });
    });
    

} else if(e.target.classList.contains('saveButton')){
  
    let equipmentName = document.querySelector('.equipmentInput-name').value;
    let equipmentCount = +document.querySelector('.equipmentInput-count').value;
    let roomId = this.state.equipmentRoom;
      
    this.cancelModal();
   
    //add new equipment and rerender <Equipments/>
    let comp = new Scorocode.Object("equipment");
    comp.set("name", equipmentName);
    comp.set("room", roomId); // значение поля id комнаты
    comp.set("count", equipmentCount);
    comp.save().then(() => {
        
    
        let eq = new Scorocode.Query("equipment");
        eq.find().then((found) => {
          let equipment = found.result;
          this.setState({
            StateEquipments: equipment,
          })
        });
    });
} else if(e.target.classList.contains('cancelButton')){
  this.cancelModal();
}
};


editEquipment = (e)=> {
  if (e.target.classList.contains('deleteButton')){
    
    let equip = new Scorocode.Object("equipment");
      equip.getById(e.target.parentNode.parentNode.id).then((item) => {
      equip.remove(item).then(() => {
        let eq = new Scorocode.Query("equipment");
        eq.find().then((found) => {
          let equipment = found.result;
          this.setState({
            StateEquipments: equipment,
          })
        });
      });
    });

  } else if(e.target.classList.contains('editButton')){
    let equipmentId = e.target.parentNode.parentNode.id
    this.setState({
      editEquipment: true,
      equipmentId: equipmentId
    })
    let sel = `#${e.target.parentNode.parentNode.id}`

    document.querySelector('.equipmentInput-name').value = document.querySelector(sel).firstChild.innerHTML
    document.querySelector('.equipmentInput-count').value = +document.querySelector(sel).children[1].innerHTML
    document.querySelector('.addEquipment-modal').classList.toggle('addEquipment-modal-active')

  } else if(e.target.classList.contains('addButton')){
    document.querySelector('.addEquipment-modal').classList.toggle('addEquipment-modal-active')
    document.querySelector('.equipmentInput-name').value = ''
    document.querySelector('.equipmentInput-count').value = ''
  }

}




render(){
  return(
    <div className='page'>
      <div className='addEquipment-modal'  onClick={this.saveEquipment}>
        <AddEquipmentModal/>
      </div>
      <div onClick={this.handleClick} className="left-sidebar">
      <Buildings 
        buildings = {this.state.StateBuldings}
      />
      </div>
      <div onClick = {this.editEquipment} className="right-sidebar">
        <h2>Equipments</h2>
        <Equipments 
        equipments = {this.state.StateEquipments} 
        childrenElemId = {this.state.childrenElemId} 
        equipmentRoom={this.state.equipmentRoom}/>
      </div>
    </div>
    
  )
};

}



export default App;





