import "./style.scss"
import React from 'react'
import Button from "@material-ui/core/Button"


function CommonModifierWindow({Content, closeHandler, customizeHandler, buttonActive}) {

    return (
        <div className="input_container">
            <div className="back" onClick={closeHandler}/>
            <div className="input_content">
                {Content}
            </div>
            <Button disabled={!buttonActive} onClick={customizeHandler} variant="contained" color="primary">
                Ввести
            </Button>
        </div>
    );
}

export default CommonModifierWindow;