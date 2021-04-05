export function randomId(){
    const LITERALS = [ '0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','g','k','l','m','n',
      'o','p','q','r','s','t','u','v','w','x','y','z','!','@','#','$','!'];
    let str = '';
    for (let i = 0; i < 20; i++){
        str+= LITERALS[Math.floor(Math.random() * 41)]
    }
    return str
}

function convertTypeView(data, resolution){
    switch(data.type){
        case "container":
            return convertContainerView(data, resolution);
        case "element":
            return convertElementView(data);
        case "modifier":
            return convertModifierView(data);
    }
}

function convertContainerView(data, resolution){
    const style = {
        border:  '1px solid #000',
        position: 'absolute',
        display: 'flex',
        left: data.start.x < data.finish.x ?  (((data.start.x/resolution.width) * 100) + '%') : (((data.finish.x/resolution.width) * 100) + '%'),
        top: data.start.y < data.finish.y ?  (((data.start.y/resolution.height) * 100) + '%') : (((data.finish.y/resolution.height) * 100) + '%'),
        width: Math.abs(((data.finish.x - data.start.x)/resolution.width) * 100)+'%',
        height: Math.abs(((data.finish.y - data.start.y)/resolution.height) * 100)+'%'
    }
    return <div style={style}></div>
}

function convertElementView(data){

}

function convertModifierView(data){

}

export function convertDataToView(data, resolution){
    return[
        data.map( x => convertTypeView(x, resolution))
    ]
}

export function walkOverToDeepest(layer, conditionHandler){

    function checkKnot(knot, conditionHandler, currentId){
        return conditionHandler(knot) ? knot.id : currentId
    }

    function goThrough(knot, conditionHandler, currentId){

    }
    let inputId = layer.id;

    layer.content.map(elm => {
        inputId =   checkKnot(elm, conditionHandler, inputId)
       if(elm.children && elm.children.length){
           elm.children.map(childElm => {
               inputId = checkKnot(childElm, conditionHandler, inputId);
           })
       }
    })
}