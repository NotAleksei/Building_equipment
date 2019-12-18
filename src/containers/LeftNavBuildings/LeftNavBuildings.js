/* eslint no-undef: "off"*/
import React from 'react';
import Rooms from '../../components/Rooms';
import classes from './LeftNavBuildings.module.css'

class LeftNavBuildings extends React.Component{

    state = {
        buildings: [],
        equipments: []
    }

    componentDidMount(){
        let buildings = new Scorocode.Query("buildings");
        buildings.find().then((finded) => {
            let newBuildings = finded.result;
            this.setState({
                buildings: newBuildings,
            })
        });
        let eq = new Scorocode.Query("equipment");
        eq.find().then((found) => {
          let newEquipments = found.result;
          this.setState({
            equipments: newEquipments,
          })
        });   
    }       

    render(){
        console.log(this.state.buildings)
        const buildings = this.state.buildings;
        const buildingsElement = buildings.map((item)=>{
            return (
            <li key={item._id}>
                <a id={item._id}  onClick ={()=>this.props.click(item._id)}>{item.name}</a>
                <Rooms rooms={item.rooms} handleClick ={this.props.click}/>
            </li>
            )
        })
        return(
            <div className={classes.LeftNav}>
                <ul className={classes.list}>
                    {this.state.buildings ? buildingsElement : null}
                </ul>
            </div>
         )
    }
}

export default LeftNavBuildings