import {connect} from "react-redux";
import "./style.scss"
import React, {useState} from 'react'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import CommonWindow from "../Common/CommonWindow"
import CommonModifierWindow from "../Common/CommonModifierWindow"


function PositionComponent(props) {

    const [sizeType, sizeTypeSelect] = useState(null);

    return (

        <CommonWindow
            Content={
                !sizeType &&
                <RadioGroup  name="size_types" value={sizeType} onChange={(ev) => {
                    sizeTypeSelect(ev.target.value)
                }}>
                    <FormControlLabel value="container" control={<Radio />} label="Процент от контейнера" />
                    <FormControlLabel value="view" control={<Radio />} label="Проценты от экрана" />
                    <FormControlLabel value="fixed" control={<Radio />} label="Фиксированные значения" />
                </RadioGroup>
            }
            hidden={!!sizeType}
            ModifierContent={
                <CommonModifierWindow
                  Content={
                      <>
                          <div className="size width_input">
                              <input type="text" className="input_value"/>
                              <span></span>
                          </div>
                          <div className="size width_input">
                          <input type="text" className="input_value"/>
                          <span></span>
                          </div>
                      </>
                  }
                />
                // <div className="input_container">
                //     <div className="input_close"/>
                //     <div className="size width_input">
                //         <input type="text" className="input_value"/>
                //         <span></span>
                //     </div>
                //     <div className="size width_input">
                //         <input type="text" className="input_value"/>
                //         <span></span>
                //     </div>
                // </div>
            }
        />
    );
}

const mapStateToProps = state =>({

})

export default connect(mapStateToProps)(PositionComponent);