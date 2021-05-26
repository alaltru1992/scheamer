export function selectAddingElement(value){
    return{
        type: "select-adding-element",
        data:{
            value
        }
    }
}

export function dropCreation(){
    return{
        type: "select-drop",

    }
}

export function selectResolution(value){
    return{
        type: "select-resolution",
        data:{
            value
        }
    }
}

export function switchLayer(value){
    return{
        type: "switch-layer",
        data:{
            activeLayer: value
        }
    }
}

export function addLayer(value){
    return{
        type: "add-layer",
        data:{
            layer:{
                name: value,
                content:[]
            }
        }
    }
}

export function addElement({type, start, finish, id, className, actualResolution}){
    let data = {
        type,
        start,
        finish,
        id,
        className,
        actualResolution,
        properties:[

        ]
    }
    if(type === "container"){
        data = {
            ...data,
            children: []
        }
    }
    return{
        type: "add-element",
        data
    }
}

export function activateCustom(data){
    return{
        type: "activate-custom",
        data
    }
}

export function disActivateCustom(){
    return{
        type: "disactivate-custom"
    }
}