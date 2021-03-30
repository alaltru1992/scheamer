import {connect} from "react-redux";
import "./style.scss"
import {useState, useEffect, useRef} from 'react'
import {selectAddingElement, selectResolution} from "../../ac"


function Header(props) {

    const {layers, creation, resolution} = props;

    const toggleLists = (list) =>{
        list === listOpend ? listToggler(null) : listToggler(list)
    }

    const elementSelect = (list, value, dispatchFunction) =>{
        toggleLists(list);
        props.dispatch(dispatchFunction(value))

    }

    const [listOpend, listToggler] = useState(null)

    return (
        <div className={"header"}>
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
        </div>
    );
}

const mapStateToProps = state =>({
    layers: state.layers,
    creation: state.creation,
    resolution: state.resolution
})

export default connect(mapStateToProps)(Header);