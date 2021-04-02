import {connect} from "react-redux";
import {useState, useEffect, useRef} from 'react'
import "./style.scss"
import { ResizeObserver } from '@juggle/resize-observer';

function LayersContainer(props) {

    const layerContainer = useRef(null)
    const [actualResolution, resolutionChange] = useState(null)

    const {layers, creation} = props;

    const startCreation = ({clientX, clientY}, type) => {
        const x = clientX - 4;
        const y = clientY - 52;
       
    }

    const creationInProgress = ( {clientX, clientY}, type) => {

    }

    const finishCreation = ({clientX, clientY}, type) => {

    }
    useEffect(() => {
        const ro = new ResizeObserver((entries, observer) => {
            resolutionChange({
                width: Math.floor((document.documentElement.clientWidth ) * 0.8) ,
                height: Math.floor((document.documentElement.clientWidth ) * 0.8 * 9 / 16)
            })
        });
        const observerOptions = {
            box: 'border-box'
        };
        ro.observe(document.documentElement, observerOptions)
        return function(){
            ro.unobserve(document.documentElement)
        }
    }, []);

    useEffect(() => {
        if(creation.creatingObject){

        }
    }, [creation]);


    return (
        <div onPointerDown={(event) => startCreation(event, creation.creatingObject)}
             onPointerUp={(event) => finishCreation(event,creation.creatingObject)}
             onPointerMove={(event) => creationInProgress(event, creation.creatingObject)}
             ref={layerContainer} className={"layers-container" + (creation.creatingObject ? " selected" : "")}>

        </div>
    );
}

const mapStateToProps = state =>({
    layers: state.layers,
    creation: state.creation
})

export default connect(mapStateToProps)(LayersContainer);