/* eslint no-undef: "off"*/
import React from 'react';
import LeftNavBuildings from './containers/LeftNavBuildings/LeftNavBuildings';
import EquipmentsArticle from './containers/EquipmentsArticle/EquipmentsArticle';
import classes from './App.module.css'


class App extends React.Component{

state = {
  currentRoomId: null,
  equipments: [],
  equipmentsList: null
}


handleClick = (currentRoomId) => {

  this.setState({
    currentRoomId: currentRoomId
  })

  this.checkEquipments(currentRoomId)
}

toggleEquipmentsList = (equipments) => {
  this.setState({
      equipments: equipments
  })
  this.checkEquipments(this.state.currentRoomId)
}

checkEquipments = (roomId) => {
  let currentEquipments = this.state.equipments

  for(let i = 0; i < currentEquipments.length; i++){
    if(roomId === 'FG7pRodZNF'){
      roomId = 'b1'
    } else if (roomId=== 'CacR5AWhfr'){
      roomId = 'b2'
    }
    if(currentEquipments[i].room && !currentEquipments[i].room.indexOf(roomId)){
      this.setState({
        equipmentsList: 'full'
      })
      break
    } else {
      this.setState({
        equipmentsList: 'empty'
      })
    }
  }
}

render(){
  return(
    <div className={classes.page}>
      <LeftNavBuildings 
        currentRoomId = {this.state.currentRoomId} 
        click = {this.handleClick}
        equipmentsList = {this.state.equipmentsList}
      />
      <EquipmentsArticle 
        currentRoomId = {this.state.currentRoomId}
        toggleEquipmentsList = {this.toggleEquipmentsList}
      />
    </div>
    
  )
};

}



export default App;





