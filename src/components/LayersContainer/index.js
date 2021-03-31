import {connect} from "react-redux";
import {useState, useEffect, useRef} from 'react'
import "./style.scss"
import { ResizeObserver } from '@juggle/resize-observer';

function LayersContainer(props) {

    const [actualResolution, resolutionChange] = useState(null)

    const {layers, creation} = props;
    useEffect(() => {
        const ro = new ResizeObserver((entries, observer) => {
            resolutionChange({
                width: (document.documentElement.clientWidth - 4) * 0.8 ,
                height: (document.documentElement.clientHeight - 60 )
            })
        });
        const observerOptions = {
            box: 'border-box'
        };
        ro.observe(document.documentElement, observerOptions)
        return function(){
            ro.unobserve(document.documentElement)
        }
    }, []);

    return (
        <div className={"layers-container" + (creation.creatingObject ? " selected" : "")}>

        </div>
    );
}

const mapStateToProps = state =>({
    layers: state.layers,
    creation: state.creation
})

export default connect(mapStateToProps)(LayersContainer);