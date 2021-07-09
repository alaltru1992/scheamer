import "./style.scss"
import React from 'react'
import classNames from "classnames";

function CommonWindow({hidden, Content, ModifierContent, closeHandler}) {

    return (
        <>
            <div className={classNames("positioning_container", {"hidden": hidden})}>
                <div className="frame">
                    {Content}
                </div>
                <div className="close" onClick={closeHandler}/>
            </div>
            {hidden && ModifierContent}
        </>
    );
}


export default CommonWindow;