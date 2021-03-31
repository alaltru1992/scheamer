import {connect} from "react-redux";
import "./style.scss"
import {useState, useEffect, useRef} from 'react'
import {selectAddingElement, selectResolution, switchLayer} from "../../ac"


function Header(props) {

    const {layers, creation, resolution} = props;

    const toggleLists = (list) =>{
        list === listOpend ? listToggler(null) : listToggler(list)
    }

    const elementSelect = (list, value, dispatchFunction) =>{
        toggleLists(list);
        props.dispatch(dispatchFunction(value))

    }

    const [listOpend, listToggler] = useState(null);
    const [addLayerFormOpened, addLayerFormToggler] = useState(false);

    const addLayerForm = addLayerFormOpened &&
        <div className={"header-add-new-layer-form"}>
            <div className={"header-add-new-layer-form-close"}/>
            <span className={"header-add-new-layer-form-label"}>Добавление слоя</span>
            <div className={"header-add-new-layer-form-name"}>
                <span className={"header-add-new-layer-form-name-label"}>Введите название</span>
                <input className={"header-add-new-layer-form-name-input"}/>
            </div>
            <button className={"header-add-new-layer-form-add"}>
                Добавить
            </button>
        </div>

    const existingLayer =  layers.layers.length &&
        <div className={"header-elements-container"}>
            <span>Слои</span>
            <div className={"header-elements-container-img" + (listOpend === "existing-layers" ? "" : " open")} onClick={() => toggleLists("existing-layers")}/>
            <ul className={"header-elements-container_list" + (listOpend === "existing-layers" ? "" : " closed") }>
                {
                    layers.layers.map(elm =>{
                        return(
                            <li key={elm.id} className={"header-elements-container_list_element"} onClick={() => elementSelect("existing-layers", elm.id, switchLayer)}>{elm.name}</li>
                        )
                    })
                }
            </ul>
        </div>


    return (
        <div className={"header"}>
            <div className={"header-containers-container"}>
                <div className={"header-elements-container"}>
                    <span>Добавить элемент</span>
                    <div className={"header-elements-container-img" + (listOpend === "selector" ? "" : " open")} onClick={() => toggleLists("selector")}/>
                    <ul className={"header-elements-container_list" + (listOpend === "selector" ? "" : " closed") }>
                        <li className={"header-elements-container_list_element"} onClick={() => elementSelect("selector", "container", selectAddingElement)}>Контейнер</li>
                        <li className={"header-elements-container_list_element"} onClick={() => elementSelect("selector", "element", selectAddingElement)}>Элемент</li>
                        <li className={"header-elements-container_list_element"} onClick={() => elementSelect("selector", "modifier", selectAddingElement)}>Модификатор</li>
                    </ul>
                </div>
                <div className={"header-elements-container"}>
                    <span>Выбрать разрешение</span>
                    <div className={"header-elements-container-img" + (listOpend === "resolution" ? "" : " open")} onClick={() => toggleLists("resolution")}/>
                    <ul className={"header-elements-container_list" + (listOpend === "resolution" ? "" : " closed") }>
                        <li className={"header-elements-container_list_element"} onClick={() => elementSelect("resolution", "1920x1080", selectResolution)}>1920x1080</li>
                        <li className={"header-elements-container_list_element"} onClick={() => elementSelect("resolution", "1280x720", selectResolution)}>1280x720</li>
                        <li className={"header-elements-container_list_element"} onClick={() => elementSelect("resolution", "1024x576", selectResolution)}>1024x576</li>
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