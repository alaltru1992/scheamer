import {combineReducers} from 'redux'
import layers from './layers'
import creation from './creation'
import resolution from './resolution'

export default combineReducers({
    layers,
    creation,
    resolution
})