import React from "react";
import {useState, useEffect, useRef} from 'react'
import "./style.scss"
import useOutsideAlert from "../../hooks/useOutsideAlerter"



function InnerContent({data, resolution, style, convertDataToView, convertContainerView}) {

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

    const [modifyElementOpened, modifyElementToggler] = useState(false);
    const [timeout, timeoutToggler] = useState(false);
    const [propertiesSelector, propertiesToggler] = useState(false)

    const selectorRef = useRef(null);

    useOutsideAlert([selectorRef], () => propertiesToggler(false))

const listSelector =
    <ul className="properties_list">
        <li className="properties_list_element">Размеры</li>
        <li className="properties_list_element">Поведение</li>
        <li className="properties_list_element">Декорация</li>
        <li className="properties_list_element">Форма</li>
        <li className="properties_list_element">Центрирование</li>
    </ul>

    const modifyElement = modifyElementOpened &&
        <div ref={selectorRef} onClick={toggleProperties} onPointerLeave={modifierLeave} onPointerEnter={modifierEnter} className={'modifier'}>
            {propertiesSelector && <div className="propertiesList">
                {listSelector}
            </div>}
        </div>




    return <div onPointerLeave={elementLeave} onPointerEnter={elementEnter} id={data.id} className={data.className} style={style}>
        {modifyElement}
        {!!data.children && !!data.children.length &&  convertDataToView(data.children,convertContainerView, {start: data.start, finish: data.finish, actualResolution: data.actualResolution}) }
    </div>

}

export default InnerContent;