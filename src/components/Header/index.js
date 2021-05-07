import {connect} from "react-redux";
import "./style.scss"
import {useState, useEffect, useRef} from 'react'
import {selectAddingElement, selectResolution, switchLayer, addLayer} from "../../ac"
import useOutsideAlerter from '../../hooks/useOutsideAlerter'


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

    useEffect(() =>{
       // console.log(layers.layers)
    },[layers])

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
            <div className={"header-elements-container-img" + (listOpend === "existing-layers" ? "" : " open")} onClick={() => toggleLists("existing-layers")}/>
            <ul className={"header-elements-container_list" + (listOpend === "existing-layers" ? "" : " closed") }>
                {
                    layers.layers.map(({name, id},i) =>{
                        return(
                            <li key={id}  className={"header-elements-container_list_element" + (id === layers.activeLayer ? " selected": "")} onClick={() => elementSelect("existing-layers", id, switchLayer)}>{name}</li>
                        )
                    })
                }
            </ul>
        </div>


    return (
        <div className={"header"}>
            <div ref={elements} className={"header-containers-container"}>
                <div className={"header-elements-container" + (!layers.layers.length ? ' not-active': '')}>
                    <span>Добавить элемент</span>
                    <div className={"header-elements-container-img" + (listOpend === "selector" ? "" : " open")} onClick={() => toggleLists("selector")}/>
                    <ul className={"header-elements-container_list" + (listOpend === "selector" ? "" : " closed") }>
                        <li className={"header-elements-container_list_element" + ("container" === creation.creatingObject ? " selected": "")} onClick={() => elementSelect("selector", "container", selectAddingElement)}>Контейнер</li>
                        <li className={"header-elements-container_list_element" + ("element" === creation.creatingObject ? " selected": "")} onClick={() => elementSelect("selector", "element", selectAddingElement)} >Элемент</li>
                        <li className={"header-elements-container_list_element" + ("modifier" === creation.creatingObject ? " selected": "")} onClick={() => elementSelect("selector", "modifier", selectAddingElement)}>Модификатор</li>
                    </ul>
                </div>
                <div ref={resolutionList} className={"header-elements-container"}>
                    <span>Выбрать разрешение</span>
                    <div className={"header-elements-container-img" + (listOpend === "resolution" ? "" : " open")} onClick={() => toggleLists("resolution")}/>
                    <ul className={"header-elements-container_list" + (listOpend === "resolution" ? "" : " closed") }>
                        <li className={"header-elements-container_list_element" + ("1920x1080" === resolution.resolution ? " selected": "")} onClick={() => elementSelect("resolution", "1920x1080", selectResolution)}>1920x1080</li>
                        <li className={"header-elements-container_list_element" + ("1280x720" === resolution.resolution ? " selected": "")} onClick={() => elementSelect("resolution", "1280x720", selectResolution)}>1280x720</li>
                        <li className={"header-elements-container_list_element" + ("1024x576" === resolution.resolution ? " selected": "")} onClick={() => elementSelect("resolution", "1024x576", selectResolution)}>1024x576</li>
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