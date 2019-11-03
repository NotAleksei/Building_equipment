/* eslint no-undef: "off"*/
import React from 'react';


class Buttons extends React.Component{

    componentDidMount(){

    }

    showEquipmentModal = () => {
        document.querySelector('.addEquipment-modal').classList.toggle('addEquipment-modal-active')
    }

    render(){
        // console.log(this.props.haveChildren)
        let buttonsHidden = 'hidden';
        if (this.props.haveChildren){
            buttonsHidden = ''
        }

        return(
           <div className={buttonsHidden}>
               <button onClick={this.showEquipmentModal}>add</button>
           </div> 
         )
    }
}





export default Buttons