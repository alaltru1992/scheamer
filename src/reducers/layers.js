import {walkOverToDeepest, conditionInContainerHandler, addToContainer, findElement} from "../helpers"

export default (state = { layers: [], activeLayer: null}, action) =>{
    switch(action.type) {
        case 'add-layer':
            const curLayers = [...state.layers, action.data.layer];
            state = {
                ...state,
                layers:[
                    ...curLayers
                ],
                activeLayer: action.data.layer.id
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
        case 'set-properties':
            let elem = findElement(state.layers, action.layerId, action.id);
            elem.properties = {
                ...elem.properties,
                ...action.props
            }
            state = {
                ...state,
            }
            break;
        case 'add-element':
            let tmpLayers = state.layers;
            const targetLayer = tmpLayers.find(x => x.id === state.activeLayer);
            const containerId =  walkOverToDeepest(targetLayer,conditionInContainerHandler, action.data,  targetLayer.id);
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