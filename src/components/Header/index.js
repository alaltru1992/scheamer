import {connect} from "react-redux";
import "./style.scss"
import {useState, useEffect, useRef} from 'react'
import {selectAddingElement, selectResolution, switchLayer, addLayer} from "../../ac"
import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import classNames from "classnames";


function Header(props) {

    const {layers, creation, resolution} = props;

    const toggleLists = (list) =>{
        list === listOpend ? listToggler(null) : listToggler(list)
    }

    const elementSelect = (list, value, dispatchFunction) =>{
        toggleLists(list);
        props.dispatch(dispatchFunction(value))
    }
    const inputLayerHandler = event => {
        newLayerNameInput(event.target.value);
    }

    const elements = useRef(null);
    const resolutionList = useRef(null);
    const layersList = useRef(null);

    const addLayerHandler = (name) => {
        if(name !== "" && !layers.layers.some(elm => elm.name === name)){
            props.dispatch(addLayer(name));
            addLayerFormToggler(false);
            newLayerNameInput('');
        }
    }


    const [listOpend, listToggler] = useState(null);
    const [addLayerFormOpened, addLayerFormToggler] = useState(false);
    const [newLayerName, newLayerNameInput] = useState('');


    useOutsideAlerter([elements, resolutionList, layersList], () => listToggler(null));

    const addLayerForm = !!addLayerFormOpened &&
        <div className={"header-add-new-layer-form"}>
            <div onClick={() => addLayerFormToggler(false)} className={"header-add-new-layer-form-close"}/>
            <span className={"header-add-new-layer-form-label"}>Добавление слоя</span>
            <div className={"header-add-new-layer-form-name"}>
                <span className={"header-add-new-layer-form-name-label"}>Введите название</span>
                <input onChange={inputLayerHandler} className={"header-add-new-layer-form-name-input"}/>
            </div>
            <button onClick={() => addLayerHandler(newLayerName)} className={"header-add-new-layer-form-add"}>
                Добавить слой
            </button>
        </div>

    const existingLayer =  !!layers.layers.length &&
        <div ref={layersList} className={"header-elements-container"}>
            <span>Слои</span>
            <div className = {classNames("header-elements-container-img", {"open" : listOpend === "existing-layers"})}  onClick={() => toggleLists("existing-layers")}/>
            <ul className = {classNames("header-elements-container_list" ,{"closed": listOpend !== "existing-layers"} ) }>
                {
                    layers.layers.map(({name, id},i) =>{
                        return(
                            <li key={id} className={classNames("header-elements-container_list_element", {"selected": id === layers.activeLayer})}   onClick={() => elementSelect("existing-layers", id, switchLayer)}>{name}</li>
                        )
                    })
                }
            </ul>
        </div>


    return (
        <div className={"header"}>
            <div ref={elements} className={"header-containers-container"}>
                <div className={classNames("header-elements-container", {'not-active' : !layers.layers.length})} >
                    <span>Добавить элемент</span>
                    <div className={classNames("header-elements-container-img", {"open": listOpend === "selector"})}  onClick={() => toggleLists("selector")}/>
                    <ul className={classNames("header-elements-container_list", {"closed": listOpend !== "selector"})}>
                        <li className={classNames("header-elements-container_list_element", {"selected": "container" === creation.creatingObject})}  onClick={() => elementSelect("selector", "container", selectAddingElement)}>Контейнер</li>
                        <li className={classNames("header-elements-container_list_element", {"selected": "element" === creation.creatingObject})}  onClick={() => elementSelect("selector", "element", selectAddingElement)} >Элемент</li>
                        <li className={classNames("header-elements-container_list_element", {"selected": "modifier" === creation.creatingObject})}  onClick={() => elementSelect("selector", "modifier", selectAddingElement)}>Модификатор</li>
                    </ul>
                </div>
                <div ref={resolutionList} className={"header-elements-container"}>
                    <span>Выбрать разрешение</span>
                    <div className={classNames("header-elements-container-img", {"open": listOpend === "resolution"})}  onClick={() => toggleLists("resolution")}/>
                    <ul className={classNames("header-elements-container_list", {"closed": listOpend !== "resolution"})} >
                        <li className={classNames("header-elements-container_list_element", {"selected": "1920x1080" === resolution.resolution})}  onClick={() => elementSelect("resolution", "1920x1080", selectResolution)}>1920x1080</li>
                        <li className={classNames("header-elements-container_list_element", {"selected": "1280x720" === resolution.resolution})}  onClick={() => elementSelect("resolution", "1280x720", selectResolution)}>1280x720</li>
                        <li className={classNames("header-elements-container_list_element", {"selected": "1024x576" === resolution.resolution})}   onClick={() => elementSelect("resolution", "1024x576", selectResolution)}>1024x576</li>
                    </ul>
                </div>
                {existingLayer}
            </div>
            <button className={"header-add-layer"} onClick={() => addLayerFormToggler(true)}>Новый слой</button>
            {addLayerForm}
        </div>
    );
}

const mapStateToProps = state =>({
    layers: state.layers,
    creation: state.creation,
    resolution: state.resolution
})

export default connect(mapStateToProps)(Header);