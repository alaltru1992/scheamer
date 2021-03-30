import {connect} from "react-redux";
import "./style.scss"

function InstrumentContainer(props) {

    const {layers} = props;

    return (
        <div className={"instrument-container"}>

        </div>
    );
}

const mapStateToProps = state =>({
    layers: state.layers,
})

export default connect(mapStateToProps)(InstrumentContainer);