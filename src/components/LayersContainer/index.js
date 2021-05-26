import {connect} from "react-redux";
import {useState, useEffect, useRef} from 'react'
import React from "react";
import "./style.scss"
import {addElement, dropCreation} from "../../ac"
import {convertDataToView, partesStyles} from "../../helpers"
import classNames from "classnames";
import InnerContent from "../InnerContentComponent";
import CustomizingComponent from "../CustomizingComponents"

function convertContainerView(data, customParentContainer){
    let startX = data.start.x;
    let startY = data.start.y;
    let finishX = data.finish.x;
    let finishY = data.finish.y;
    let LEFT;
    let TOP;
    let WIDTH;
    let HEIGHT;
    if(customParentContainer){
        const parentStartX = customParentContainer.start.x * (data.actualResolution.width / customParentContainer.actualResolution.width);
        const parentStartY = customParentContainer.start.y * (data.actualResolution.height / customParentContainer.actualResolution.height);
        const parentFinishX = customParentContainer.finish.x * (data.actualResolution.width / customParentContainer.actualResolution.width);
        const parentFinishY = customParentContainer.finish.y * (data.actualResolution.height / customParentContainer.actualResolution.height);
        LEFT = startX < finishX ? ((( startX - parentStartX) / (parentFinishX - parentStartX)) * 100) : (((finishX - parentStartX) / (parentFinishX - parentStartX)) * 100);
        TOP = startY < finishY ? (((startY - parentStartY) / (parentFinishY - parentStartY)) * 100) : (((finishY - parentStartY) / (parentFinishY - parentStartY)) * 100);
        WIDTH = Math.abs(((data.finish.x - data.start.x) / (parentFinishX - parentStartX)) * 100);
        HEIGHT =  Math.abs(((data.finish.y - data.start.y) / (parentFinishY - parentStartY)) * 100);
    }
    else {
        LEFT = startX < finishX ? (((startX / data.actualResolution.width) * 100)) : (((finishX / data.actualResolution.width) * 100));
        TOP = startY < finishY ? (((startY / data.actualResolution.height) * 100)) : (((finishY / data.actualResolution.height) * 100));
        WIDTH = Math.abs(((data.finish.x - data.start.x) / data.actualResolution.width) * 100);
        HEIGHT = Math.abs(((data.finish.y - data.start.y) / data.actualResolution.height) * 100);
    }
    const style =  partesStyles(data.type, {LEFT, TOP, WIDTH, HEIGHT}, data.properties)


    return ( <InnerContent
        data={data}  style={style} convertDataToView = {convertDataToView} convertContainerView={convertContainerView}
    />)
    // return <div id={data.id} className={data.className} style={style}>
    //     {!!data.children && !!data.children.length &&  convertDataToView(data.children, resolution,convertContainerView, {start: data.start, finish: data.finish}) }
    // </div>
}

function LayersContainer(props) {

    const layerContainer = useRef(null)
    const [creatingObj, creatingObjHandler] = useState(null)
    const [addElementFormOpened, addElementFormToggler] = useState(false)
    const [currentClassName, currentClassNameInput] = useState(false)
    const [addingData, addingDataSet] = useState({})

    const {layers, creation, customizing} = props;

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


    const addClassName = (event) =>{
        currentClassNameInput(event.target.value)
    }


    const addElementToTree = () =>{
        props.dispatch(addElement({...addingData, actualResolution: getActualResolution(), className: currentClassName}));
        creatingObjHandler(null);
        props.dispatch(dropCreation());
        currentClassNameInput('');
        addElementFormToggler(false);
    }


    const getActualResolution = () =>{
        return {
            width: Math.floor((document.documentElement.clientWidth ) * 0.8) ,
            height: Math.floor((document.documentElement.clientWidth ) * 0.8 * 9 / 16)
        }
    }

    const finishCreation = ({clientX, clientY}, type) => {
        if(type && !addElementFormOpened) {
            const x = clientX - 4;
            const y = clientY - 52;
           addingDataSet({type, ...creatingObj, finish:{x,y}, id: layers.activeLayer})
        }
    }


    useEffect(() => {
        if(creation.creatingObject){

        }
    }, [creation]);



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
             ref={layerContainer} className={classNames("layers-container", {"selected": creation.creatingObject})} >
            {
                !!layers.layers.length && convertDataToView(layers.layers.find(x => x.id === layers.activeLayer).content, convertContainerView, null)
            }
            {addElementForm}
            {customizing.active && <CustomizingComponent/>}
        </div>
    );
}

const mapStateToProps = state =>({
    layers: state.layers,
    creation: state.creation,
    resolution: state.resolution,
    customizing: state.customizing
})

export default connect(mapStateToProps)(LayersContainer);