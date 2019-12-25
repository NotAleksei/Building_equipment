/* eslint no-undef: "off"*/
import React from 'react';
import EditButton from '../../components/UI/EditButton/EditButton';
import DeleteButton from '../../components/UI/DeleteButton/DeleteButton';
import AddButton from '../../components/UI/AddButton/AddButton';
import AddEquipmentModal from '../../components/AddEquipmentModal/AddEquipmentModal'
import EditEquipmentModal from '../../components/EditEquipmentModal/EditEquipmentModal'
import CleanAll from '../../components/UI/CleanAll/CleanAll'


class EquipmentsArticle extends React.Component{
    
    state ={
        equipments: [],
        activeAddModal: false,
        activeEditModal: false,
        currentItem: {},
    }
    
componentDidMount(){
    let eq = new Scorocode.Query("equipment");
    eq.find().then((found) => {
      let newEquipments = found.result;
      this.setState({
        equipments: newEquipments,
      })
      this.props.toggleEquipmentsList(newEquipments)
    });
  
}

reloadEquipment = () => {
    let eq = new Scorocode.Query("equipment");
    eq.find().then((found) => {
      let newEquipments = found.result;
      this.setState({
        equipments: newEquipments,
      })
      this.props.toggleEquipmentsList(newEquipments)
    });
}

showAddModal = () => {
  this.setState({
    activeAddModal: !this.state.activeAddModal
  })
}


showEditModal = (id, name, count) => {
  this.setState({
    activeEditModal: !this.state.activeEditModal,
    currentItem: {id, name, count}
  })
}

    render(){

        let equipmentElement = this.state.equipments.map((item)=>{
          let currentRoomId = this.props.currentRoomId
          if(this.props.currentRoomId === 'FG7pRodZNF'){
            currentRoomId = 'b1'
          } else if (this.props.currentRoomId === 'CacR5AWhfr'){
            currentRoomId = 'b2'
          }
          if(item.room && !item.room.indexOf(currentRoomId)){
            return (
                  <tr className='equipment' key={item._id} id={item._id}>
                      <td>{item.name}</td>
                      <td>{item.count}</td>
                      <td>
                          <EditButton id={item._id} showEditModal={this.showEditModal} currentItem={{id:item._id, name:item.name, count:item.count}}/>
                          <DeleteButton id={item._id} reloadEquipment = {this.reloadEquipment}/>
                      </td>
                  </tr>
          )}
        })

        
        return(
               <div className='equipment-table'>
                    {this.state.activeAddModal ? <AddEquipmentModal 
                      roomId = {this.props.currentRoomId}
                      showAddModal = {this.showAddModal}
                      reloadEquipment = {this.reloadEquipment}
                     /> : null}
                    {this.state.activeEditModal ? <EditEquipmentModal 
                      showEditModal = {this.showEditModal}
                      reloadEquipment ={this.reloadEquipment}
                      currentItem = {this.state.currentItem}
                     /> : null}

                    <table>
                          {equipmentElement}
                    </table>

                    {this.props.currentRoomId && this.props.currentRoomId.indexOf('room') > 0 ? <AddButton 
                      roomId = {this.props.currentRoomId} 
                      showAddModal={this.showAddModal}
                    /> : null}
                    <CleanAll equipments={this.state.equipments}/>
               </div>
         )
    }
}


export default EquipmentsArticle