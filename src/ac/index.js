export function selectAddingElement(value){
    return{
        type: "select-adding-element",
        data:{
            value
        }
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
                name: value
            }
        }
    }
}