import "./style.scss"
import {connect} from 'react-redux'
import Header from "./components/Header"
import InstrumentContainer from "./components/InstrumentContainer"
import LayersContainer from "./components/LayersContainer"

function App(props) {

  const {layers} = props;

  return (
    <div className={"main"}>
      <Header/>
      <LayersContainer/>
      <InstrumentContainer/>
    </div>
  );
}

const mapStateToProps = state =>({
  layers: state.layers,
})

export default connect(mapStateToProps)(App);
