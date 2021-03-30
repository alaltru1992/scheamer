import "./style.scss"
import {connect} from 'react-redux'

function App(props) {

  const {layers} = props;

  return (
    <div className={"main"}>

    </div>
  );
}

const mapStateToProps = state =>({
  layers: state.layers,
})

export default connect(mapStateToProps)(App);
