import {connect} from "react-redux";
import "./style.scss"
import {useState, useEffect, useRef} from 'react'
import {selectAddingElement, selectResolution, switchLayer, addLayer} from "../../ac"
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import classNames from "classnames";

import PositionComponent from "./Components/PositionComponent"
import BehaviourComponent from "./Components/BehaviourComponent"
import DecorationComponent from "./Components/DecorationComponent"
import FormComponent from "./Components/FormComponent"
import CentringComponent from "./Components/CentringComponent"


function CustomizingComponent(props) {
    const {customizing} = props;

    const factory = type =>{
        switch (type){
            case 'size':
                return <PositionComponent/>
                break
            case 'behaviour':
                return <BehaviourComponent/>
                break
            case 'decoration':
                return <DecorationComponent/>
                break
            case 'form':
                return <FormComponent/>
                break
            case 'centring':
                return <CentringComponent/>
                break
        }
    }

    return (
        <div className="customizing_container">
            {
                factory(customizing.type)
            }
        </div>
    );
}

const mapStateToProps = state =>({
    customizing: state.customizing
})

export default connect(mapStateToProps)(CustomizingComponent);