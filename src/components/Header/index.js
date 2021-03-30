import {connect} from "react-redux";
import "./style.scss"

function Header(props) {

    const {layers} = props;

    return (
        <div className={"header"}>

        </div>
    );
}

const mapStateToProps = state =>({
    layers: state.layers,
})

export default connect(mapStateToProps)(Header);