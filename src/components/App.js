/* eslint no-undef: "off"*/
import React from 'react';
import Buildings from './Buildings';
import Equipments from './Equipments';
import AddEquipmentModal from './AddEquipmentModal'

class App extends React.Component{

state = {
  StateBuldings: [],
  StateEquipments: [],
  isShowEquip: true,
  equipmentRoom: undefined,
  childrenElemId: undefined,
}

componentDidMount(){
    
    let buildings = new Scorocode.Query("buildings");
    buildings.find().then((finded) => {
      let buildings = finded.result;
      // console.info(buildings);
      this.setState({
        StateBuldings: buildings,
      })
    
    let eq = new Scorocode.Query("equipment");
    eq.find().then((found) => {
      let equipment = found.result;
      // console.info(equipment);
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

  this.state.StateEquipments.map((item)=>{
    if(room === item.room){
      this.setState({
        isShowEquip: false,
      })
    }
})

  // if(!this.state.isShowEquip){
  //   e.target.nextSibling.classList.toggle('hidden', true)
  //   this.setState({
  //     isShowEquip: true,
  //   })
  //   console.log(this.state.isShowEquip)
  // }
  
  this.setState({
    childrenElemId: childrenElemId,
    equipmentRoom: room,
  })
  
}
};


cancelModal = () => {
    document.querySelector('.addEquipment-modal-active').classList.toggle('addEquipment-modal-active')

};

addEquipment = (e) => {
  
  if(e.target.classList.contains('saveButton')){
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
      // console.info("Done");
  
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

render(){
  return(
    <div className='page'>
      <div className='addEquipment-modal'  onClick={this.addEquipment}>
        <AddEquipmentModal/>
      </div>
      <div onClick={this.handleClick}>
      <Buildings 
        buildings = {this.state.StateBuldings}
      />
      </div>
      <Equipments 
        equipments = {this.state.StateEquipments} 
        childrenElemId = {this.state.childrenElemId} 
        equipmentRoom={this.state.equipmentRoom}/>
    </div>
    
  )
};

}



export default App;





