import {randomId} from "../helpers"
import {switchLayer} from "../ac"

export default store => next => action =>{

    if(action.type === "add-layer") {
        action = {
            ...action,
            data:{
                layer: {
                    ...action.data.layer,
                    id: randomId()
                }
            }
        }
        next(action)
        next(switchLayer(action.data.layer.id))
    }
    else{
        next(action)
    }
}





