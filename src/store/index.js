import {createStore, compose, applyMiddleware} from 'redux'
import reducer from "../reducers/index"

// const enchancer = compose(applyMiddleware(middlewares), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const store = createStore(reducer);
// const store = createStore(reducer, enchancer);

window.store = store;

export default store