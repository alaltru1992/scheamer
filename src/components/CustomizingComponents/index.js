import {connect} from "react-redux";
import "./style.scss"
import {useState, useEffect, useRef} from 'react'
import {selectAddingElement, selectResolution, switchLayer, addLayer} from "../../ac"
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import classNames from "classnames";


function CustomizingComponent(props) {


    const factory = type =>{

    }

    return (
        <div className="customizing_container">

        </div>
    );
}

const mapStateToProps = state =>({

})

export default connect(mapStateToProps)(CustomizingComponent);