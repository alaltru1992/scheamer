import {connect} from "react-redux";
import {useState, useEffect, useRef} from 'react'
import "./style.scss"
import { ResizeObserver } from '@juggle/resize-observer';
import {addElement} from "../../ac"

function LayersContainer(props) {

    const layerContainer = useRef(null)
    const [actualResolution, resolutionChange] = useState(null)
    const [creatingObj, creatingObjHandler] = useState(null)

    const {layers, creation} = props;

    const startCreation = ({clientX, clientY}, type) => {
        if(type) {
            const x = clientX - 4;
            const y = clientY - 52;
            !creatingObj && creatingObjHandler({
                start:{
                    x,y
                }
            })
        }
    }

    const creationInProgress = ( {clientX, clientY}, type) => {

    }

    const finishCreation = ({clientX, clientY}, type) => {
        if(type) {
            const x = clientX - 4;
            const y = clientY - 52;
            props.dispatch(addElement({type, ...creatingObj, finish:{x,y}, layerId: layers.activeLayer}));
            creatingObjHandler(null);
        }
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