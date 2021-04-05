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
            const tmpLayers = state.layers;
            tmpLayers.find(x => x.id === action.data.layerId).content.push({
                ...action.data
            })

            state = {
                ...state,
                layers:[
                    ...tmpLayers
                ]
            }
            debugger
            break;
        default:
          break;
    }
    return state
}