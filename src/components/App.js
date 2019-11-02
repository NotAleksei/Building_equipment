/* eslint no-undef: "off"*/
import React from 'react';
import Buildings from './Buildings';
import Equipments from './Equipments';

class App extends React.Component{

state = {
  StateBuldings: [],
  StateEquipments: [],
  isShowEquip: 'none',
  equipmentRoom: undefined,
  childrenElemId: []
}

async componentDidMount(){
    
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
      console.info(equipment);
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
      // this.setState({
      //   isShowEquip: 'block',
      // })
    }
})
  this.setState({
    childrenElemId: childrenElemId,
    equipmentRoom: room,
  })
}
}




render(){
  return(
    <div className={'page'}>
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





