const RESOLUTIONS =  [
    {
        "1920x1080":{
            width: 1920,
            height: 1080
        },
        "1280x720":{
            width: 1280,
            height: 720
        },
        "1024x576":{
            width: 1024,
            height: 576
        }
    }
]

export default (state = { resolution: "1920x1080", value: RESOLUTIONS.find(x => x["1920x1080"])["1920x1080"]}, action) =>{
    switch(action.type) {
        case 'select-resolution':
            state = {
                ...state,
                resolution: action.data.value,
                value: RESOLUTIONS.find(x => x[action.data.value])[action.data.value]
            }
            break;
        default:
            break;
    }
    return state
}