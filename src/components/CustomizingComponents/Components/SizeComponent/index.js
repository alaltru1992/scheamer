import {connect, useDispatch} from "react-redux";
import "./style.scss"
import React, {useState, useEffect} from 'react'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import CommonWindow from "../Common/CommonWindow"
import CommonModifierWindow from "../Common/CommonModifierWindow"
import {disActivateCustom, setProperties} from "../../../../ac"

const SYMBOLS = {
    container : "%",
    view: "%",
    fixed: "px"
}


function PositionComponent({customizing:{id, layerId, type}}) {

    const dispatch = useDispatch();

    const [sizeType, sizeTypeSelect] = useState(null);
    const [width, widthSet] = useState(null);
    const [height, heightSet] = useState(null);

    const customizeElement = () =>{
        dispatch(setProperties({id, layerId, changeType: type, props:{width: width+SYMBOLS[sizeType], height: height + SYMBOLS[sizeType]}}))
    }

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
            closeHandler={ () => dispatch(disActivateCustom())}
            ModifierContent={
                <CommonModifierWindow
                  Content={
                      <>
                          <div className="size width_input">
                            <span className="label">Ширина</span>
                            <input onChange={(ev) => widthSet(+ev.target.value)} type="text" className="input_value"/>
                            <span className="symbol">{SYMBOLS[sizeType]}</span>
                          </div>
                          <div className="size height_input">
                           <span className="label">Высота</span>
                           <input onChange={(ev) => heightSet(+ev.target.value)} type="text" className="input_value"/>
                            <span className="symbol">{SYMBOLS[sizeType]}</span>
                          </div>
                      </>
                  }
                  closeHandler={() => sizeTypeSelect(null)}
                  customizeHandler={customizeElement}
                  buttonActive={width && height}
                />
            }
        />
    );
}

const mapStateToProps = state =>({
    customizing: state.customizing
})

export default connect(mapStateToProps)(PositionComponent);