import React from "react";
import {useState, useEffect, useRef} from 'react'
import "./style.scss"



function InnerContent({data, resolution, style, convertDataToView, convertContainerView}) {


    const modifierEnter = () =>{
        timeout && timeoutToggler(clearTimeout(timeout))
    }

    const modifierLeave = () =>{
        timeoutToggler(setTimeout(() => modifyElementToggler(false), 4000))
    }

    const elementEnter = () =>{
        modifyElementToggler(true);
        timeoutToggler(setTimeout(() => modifyElementToggler(false), 4000))
    }

    const elementLeave = () =>{
        modifyElementToggler(false);
        timeout && timeoutToggler(clearTimeout(timeout))
    }

    const [modifyElementOpened, modifyElementToggler] = useState(false);
    const [timeout, timeoutToggler] = useState(false);

    const modifyElement = modifyElementOpened && <div onPointerLeave={modifierLeave} onPointerEnter={modifierEnter} className={'modifier'}/>


    return <div onPointerLeave={elementLeave} onPointerEnter={elementEnter} id={data.id} className={data.className} style={style}>
        {modifyElement}
        {!!data.children && !!data.children.length &&  convertDataToView(data.children,convertContainerView, {start: data.start, finish: data.finish, actualResolution: data.actualResolution}) }
    </div>

}

export default InnerContent;