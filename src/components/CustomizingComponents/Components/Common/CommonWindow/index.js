import "./style.scss"
import React from 'react'
import classNames from "classnames";

function CommonWindow({hidden, Content, ModifierContent}) {

    return (
        <>
            <div className={classNames("positioning_container", {"hidden": hidden})}>
                <div className="frame">
                    {Content}
                </div>
            </div>
            {hidden && ModifierContent}
        </>
    );
}


export default CommonWindow;