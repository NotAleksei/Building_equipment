/* eslint no-undef: "off"*/
import React from 'react';
import Rooms from '../../components/Rooms/Rooms';
import Indicator from '../../components/UI/Indicator/Indicator'
import classes from './LeftNavBuildings.module.css'

class LeftNavBuildings extends React.Component{

    state = {
        buildings: [],
    }



    componentDidMount(){
        let buildings = new Scorocode.Query("buildings");
        buildings.find().then((finded) => {
            let newBuildings = finded.result;
            this.setState({
                buildings: newBuildings,
            })
            console.log(newBuildings)
        });
    }       



    render(){

        const buildings = this.state.buildings;
        const buildingsElement = buildings.map((item)=>{
            return (
            <li key={item._id}>
                <a id={item._id}  onClick ={()=>this.props.click(item._id)}>{item.name}</a>
                {this.props.currentRoomId == item._id ? <Indicator equipmentsList = {this.props.equipmentsList}/> : null}
                <Rooms 
                    rooms={item.rooms}
                    handleClick ={this.props.click}
                    currentRoomId = {this.props.currentRoomId}
                    equipmentsList = {this.props.equipmentsList}
                />
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