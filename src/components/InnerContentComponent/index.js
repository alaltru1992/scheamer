import React from "react";
import {useState, useEffect, useRef} from 'react'
import "./style.scss"
import useOutsideAlert from "../../hooks/useOutsideAlerter"
import {connect} from "react-redux";
import {activateCustom} from "../../ac"


function InnerContent(props) {
    const {data, resolution, style, convertDataToView, convertContainerView, dispatch, layers, currentScreen} = props;

    const modifierEnter = () =>{
        timeout && timeoutToggler(clearTimeout(timeout))
    }

    const modifierLeave = () =>{
        timeoutToggler(setTimeout(() => modifyElementToggler(false), 4000))
    }

    const elementEnter = ev =>{
        modifyElementToggler(true);
        timeoutToggler(setTimeout(() => modifyElementToggler(false), 4000))
    }

    const elementLeave = ev =>{
        modifyElementToggler(false);
        timeout && timeoutToggler(clearTimeout(timeout))
        propertiesToggler(false)
    }

    const toggleProperties = () =>{
        propertiesToggler(!propertiesSelector)
        timeout && timeoutToggler(clearTimeout(timeout))
    }

    const customizeActivation = type =>{
        dispatch(activateCustom({type, id: data.id, layerId: layers.activeLayer}))
    }

    const [modifyElementOpened, modifyElementToggler] = useState(false);
    const [timeout, timeoutToggler] = useState(false);
    const [propertiesSelector, propertiesToggler] = useState(false)

    const selectorRef = useRef(null);

    useOutsideAlert([selectorRef], () => propertiesToggler(false))

const listSelector =
    <ul className="properties_list">
        <li onClick={() => customizeActivation('size')} className="properties_list_element">Размеры</li>
        <li onClick={() => customizeActivation('behaviour')} className="properties_list_element">Поведение</li>
        <li onClick={() => customizeActivation('decoration')} className="properties_list_element">Декорация</li>
        <li onClick={() => customizeActivation('form')} className="properties_list_element">Форма</li>
        <li onClick={() => customizeActivation('centring')} className="properties_list_element">Центрирование</li>
    </ul>

    const modifyElement = modifyElementOpened &&
        <div ref={selectorRef} onClick={toggleProperties} onPointerLeave={modifierLeave} onPointerEnter={modifierEnter} className={'modifier'}>
            {propertiesSelector && <div className="propertiesList">
                {listSelector}
            </div>}
        </div>


    const countHandler = () =>{
        return !!data.children && !!data.children.length &&  convertDataToView(data.children,convertContainerView, {start: data.start, finish: data.finish, actualResolution: data.actualResolution}, resolution, currentScreen)
    }


    return <div onPointerLeave={elementLeave} onPointerEnter={elementEnter} id={data.id} className={data.className} style={style}>
        {modifyElement}
        { countHandler() }
    </div>

}

const mapStateToProps = state =>({
    layers: state.layers,
    resolution: state.resolution
})

export default connect(mapStateToProps) (InnerContent);