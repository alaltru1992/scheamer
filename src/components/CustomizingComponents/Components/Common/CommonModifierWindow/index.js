import "./style.scss"
import React from 'react'


function CommonModifierWindow({Content}) {

    return (
        <div className="input_container">
            <div className="input_close"/>
            <div className="input_content">
                {Content}
            </div>
        </div>
    );
}

export default CommonModifierWindow;