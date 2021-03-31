import {createStore, compose, applyMiddleware} from 'redux'
import reducer from "../reducers/index"
import middlewares from "../middlewares"

 const enchancer = compose(applyMiddleware(middlewares));

 const store = createStore(reducer, enchancer);

window.store = store;

export default store