export default (state = { resolution: "1920x1080"}, action) =>{
    switch(action.type) {
        case 'select-resolution':
            state = {
                ...state,
                resolution: action.data.value
            }
            break;
        default:
            break;
    }
    return state
}