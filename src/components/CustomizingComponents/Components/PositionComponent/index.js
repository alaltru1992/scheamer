import {connect} from "react-redux";
import "./style.scss"
import {useState, useEffect, useRef} from 'react'
import classNames from "classnames";


function PositionComponent(props) {



    return (
         <div className="positioning_container">
             <div className="frame">

             </div>
         </div>
    );
}

const mapStateToProps = state =>({

})

export default connect(mapStateToProps)(PositionComponent);