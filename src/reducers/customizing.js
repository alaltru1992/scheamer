export default (state = { active: false, layerId: null, id: null, type: null}, action) =>{
    switch(action.type) {
        case 'activate-custom':
            state = {
                ...state,
                active: true,
                layerId: action.data.layerId,
                id: action.data.id,
                type: action.data.type
            }
            break;
        case 'disactivate-custom':
            state = {
                ...state,
                active: false,
                layerId: null,
                id: null,
                type: null
            }
            break;
        default:
            break;
    }
    return state
}