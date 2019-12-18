/* eslint no-undef: "off"*/
import React from 'react';
import EditButton from '../../components/UI/EditButton/EditButton';
import DeleteButton from '../../components/UI/DeleteButton/DeleteButton';
import AddButton from '../../components/UI/AddButton/AddButton';
import AddEquipmentModal from '../../components/AddEquipmentModal/AddEquipmentModal'
import CleanAll from '../../components/UI/CleanAll/CleanAll'


class EquipmentsArticle extends React.Component{
    
    state ={
        equipments: [],
        activeModal: false,
    }
    
componentDidMount(){
    let eq = new Scorocode.Query("equipment");
    eq.find().then((found) => {
      let newEquipments = found.result;
      this.setState({
        equipments: newEquipments,
      })
    });
    
}
componentDidUpdate(){
  console.log('отрендерил новый список компонентов', this.state.equipments)
}

reloadEquipment = () => {
    let eq = new Scorocode.Query("equipment");
    eq.find().then((found) => {
      let newEquipments = found.result;
      this.setState({
        equipments: newEquipments,
      })
    });
    console.log('упс, я перезагрузился')
}

showModal = () => {
  this.setState({
    activeModal: !this.state.activeModal
  })
}
    render(){

        let equipmentElement = this.state.equipments.map((item)=>{
            if(item.room && !item.room.indexOf(this.props.id)){
            return (
                   <tr className='equipment' key={item._id} id={item._id}>
                        <td>{item.name}</td>
                        <td>{item.count}</td>
                        <td>
                            <EditButton id={item._id} reloadEquipment = {this.reloadEquipment}/>
                            <DeleteButton id={item._id} reloadEquipment = {this.reloadEquipment}/>
                        </td>
                    </tr>
                )}
        })
        

        return(
               <div className='equipment-table'>
                    {this.state.activeModal ? <AddEquipmentModal 
                    id = {this.props.id}
                     showModal = {this.showModal}
                     reloadEquipment ={this.reloadEquipment}
                     /> : null}
                    <table>
                          {equipmentElement}
                    </table>
                    {this.props.id && this.props.id.indexOf('room') > 0 ? <AddButton 
                    roomId = {this.props.id} 
                    showModal={this.showModal}
                    /> : null}
                    <CleanAll equipments={this.state.equipments}/>
               </div>
         )
    }
}


export default EquipmentsArticle