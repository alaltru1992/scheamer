import {connect} from "react-redux";
import {useState, useEffect, useRef} from 'react'
import "./style.scss"

function LayersContainer(props) {

    const {layers, creation} = props;

    return (
        <div className={"layers-container" + (creation.creatingObject ? " selected" : "")}>

        </div>
    );
}

const mapStateToProps = state =>({
    layers: state.layers,
    creation: state.creation
})

export default connect(mapStateToProps)(LayersContainer);