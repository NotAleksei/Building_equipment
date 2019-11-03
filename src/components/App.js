/* eslint no-undef: "off"*/
import React from 'react';
import Buildings from './Buildings';
import Equipments from './Equipments';
import AddEquipmentModal from './AddEquipmentModal'

class App extends React.Component{

state = {
  StateBuldings: [],
  StateEquipments: [],
  // hasEquipMarker: false,
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
      console.log(equipment)
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
  
  // for(let item of this.state.StateEquipments){
  //   if(room === item.room){
  //     this.setState({
  //       hasEquipMarker: true,
  //     })
  //     break
  //    } else {
  //     this.setState({
  //       hasEquipMarker: false,
  //     })
      
  //   }
  // }
//   this.state.StateEquipments.map((item)=>{
    
// })

  // if(this.state.hasEquipMarker){
  //   e.target.nextSibling.classList.toggle('hidden')
  // } 

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
      console.info("done")
      let eq = new Scorocode.Query("equipment");
      eq.find().then((found) => {
        let equipment = found.result;
        console.info(equipment);
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
          console.info(equipment);
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
    console.log(e.target.parentNode.id)
    let equip = new Scorocode.Object("equipment");
      equip.getById(e.target.parentNode.id).then((item) => {
      equip.remove(item).then(() => {
        let eq = new Scorocode.Query("equipment");
        eq.find().then((found) => {
          let equipment = found.result;
          console.info(equipment);
          this.setState({
            StateEquipments: equipment,
          })
        });
      });
    });

  } else if(e.target.classList.contains('editButton')){
    let equipmentId = e.target.parentNode.id;
    console.log(equipmentId)
    this.setState({
      editEquipment: true,
      equipmentId: equipmentId
    })
    document.querySelector('.addEquipment-modal').classList.toggle('addEquipment-modal-active')

  }

}




render(){
  return(
    <div className='page'>
      <div className='addEquipment-modal'  onClick={this.saveEquipment}>
        <AddEquipmentModal/>
      </div>
      <div onClick={this.handleClick}>
      <Buildings 
        buildings = {this.state.StateBuldings}
      />
      </div>
      <div onClick = {this.editEquipment}>
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





