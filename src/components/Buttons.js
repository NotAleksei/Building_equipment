/* eslint no-undef: "off"*/
import React from 'react';


class Buttons extends React.Component{

    render(){

        let buttonsHidden = 'hidden';
        if (this.props.haveChildren){
            buttonsHidden = ''
        }

        return(
           <div className={buttonsHidden}>
               <button  className='addButton'>add</button>
           </div> 
         )
    }
}





export default Buttons