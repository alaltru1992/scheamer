import {connect} from "react-redux";
import "./style.scss"

function LayersContainer(props) {

    const {layers} = props;

    return (
        <div className={"layers-container"}>

        </div>
    );
}

const mapStateToProps = state =>({
    layers: state.layers,
})

export default connect(mapStateToProps)(LayersContainer);