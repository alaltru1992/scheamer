export default (state = { creatingObject: null}, action) =>{
    switch(action.type) {
        case 'select-adding-element':
            state = {
                ...state,
                creatingObject: action.data.value
            }
            break;
        case 'select-drop':
            state = {
                ...state,
                creatingObject: null
            }
            break;
        default:
            break;
    }
    return state
}