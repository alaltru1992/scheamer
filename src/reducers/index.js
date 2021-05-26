import {combineReducers} from 'redux'
import layers from './layers'
import creation from './creation'
import resolution from './resolution'
import customizing from "./customizing";

export default combineReducers({
    layers,
    creation,
    resolution,
    customizing
})