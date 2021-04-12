import {walkOverToDeepest, conditionInContainerHandler, addToContainer} from "../helpers"

export default (state = { layers: [], activeLayer: null}, action) =>{
    switch(action.type) {
        case 'add-layer':
            state = {
                ...state,
                layers:[
                    ...state.layers,
                    action.data.layer
                ]
            }
            break;

        case 'remove-layer':
            state = {
                ...state,
                layers : [... state.layers.splice(state.indexOf(state.layers.find(({id}) => id === action.data.deleteId)), 1)]
            }
            break;

        case 'switch-layer':
            state = {
                ...state,
                activeLayer: action.data.activeLayer
            }
            break;
        case 'add-element':
            let tmpLayers = state.layers;
            const targetLayer = tmpLayers.find(x => x.id === action.data.layerId);
            const containerId =  walkOverToDeepest(targetLayer,conditionInContainerHandler, action.data );
            addToContainer(tmpLayers, containerId, action.data)

            state = {
                ...state,
                layers:[
                    ...tmpLayers
                ]
            }
            break;
        default:
          break;
    }
    return state
}