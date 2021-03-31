export default (state = { layers: [], x: null}, action) =>{
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
        default:
          break;
    }
    return state
}