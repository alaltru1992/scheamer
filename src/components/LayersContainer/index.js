import {connect} from "react-redux";
import {useState, useEffect, useRef} from 'react'
import "./style.scss"
import { ResizeObserver } from '@juggle/resize-observer';
import {addElement, dropCreation} from "../../ac"
import {convertDataToView} from "../../helpers"

function LayersContainer(props) {

    const layerContainer = useRef(null)
    const [actualResolution, resolutionChange] = useState(null)
    const [creatingObj, creatingObjHandler] = useState(null)
    const [innerContent, innerContentChange] = useState(null)
    const [addElementFormOpened, addElementFormToggler] = useState(false)
    const [currentClassName, currentClassNameInput] = useState(false)
    const [addingData, addingDataSet] = useState({})

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

    const addClassName = (event) =>{
        currentClassNameInput(event.target.value)
    }


    const addElementToTree = () =>{
        props.dispatch(addElement({...addingData, className: currentClassName}));
        creatingObjHandler(null);
        props.dispatch(dropCreation());
        currentClassNameInput('');
        addElementFormToggler(false);
    }


    const finishCreation = ({clientX, clientY}, type) => {
        if(type && !addElementFormOpened) {
            const x = clientX - 4;
            const y = clientY - 52;
           addingDataSet({type, ...creatingObj, finish:{x,y}, id: layers.activeLayer})
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

    useEffect(() => {
        !!layers.layers.length &&
        innerContentChange(convertDataToView(layers.layers.find(x => x.id === layers.activeLayer).content, actualResolution, null))
    }, [layers]);

    useEffect(() => {
        if(Object.keys(addingData).length){
            addElementFormToggler(true);
        }
    }, [addingData]);

    const addElementForm = !!addElementFormOpened &&
        <div className={"layers-container-add-new-layer-form"}>
            <div onClick={() => addElementFormToggler(false)} className={"layers-container-add-new-layer-form-close"}/>
            <span className={"layers-container-add-new-layer-form-label"}>Добавление элемента</span>
            <div className={"layers-container-add-new-layer-form-name"}>
                <span className={"layers-container-add-new-layer-form-name-label"}>Введите название класса</span>
                <input onChange={addClassName} className={"layers-container-add-new-layer-form-name-input"}/>
            </div>
            <button onClick={() => addElementToTree()} className={"layers-container-add-new-layer-form-add"}>
                Добавить элемент
            </button>
        </div>


    return (
        <div onPointerDown={(event) => startCreation(event, creation.creatingObject)}
             onPointerUp={(event) => finishCreation(event,creation.creatingObject)}
             onPointerMove={(event) => creationInProgress(event, creation.creatingObject)}
             ref={layerContainer} className={"layers-container" + (creation.creatingObject ? " selected" : "")}>
            {
                innerContent
            }
            {addElementForm}
        </div>
    );
}

const mapStateToProps = state =>({
    layers: state.layers,
    creation: state.creation,
    resolution: state.resolution
})

export default connect(mapStateToProps)(LayersContainer);