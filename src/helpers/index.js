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

export function walkOverToDeepest(layer, conditionHandler, element){
    return  walkTree(layer.content, conditionHandler, element, layer.id)
}

function walkTree(content, conditionHandler, element, initialId){
  let tmpId = initialId;
  content.map( (container, index) => {
      if(conditionHandler(container,element)){
        tmpId = container.id;
          if(container.children.length){
              tmpId = walkTree(container.children, conditionHandler, element, tmpId)
          }
      }
  })
    return tmpId
}

export function conditionInContainerHandler({start: containerStart, finish: containerFinish, type}, {start: elemStart, finish: elemFinish}){
    if (type !== "container") return false
    const ContCoords = {
        xStart: Math.min(containerStart.x, containerFinish.x),
        yStart: Math.min(containerStart.y, containerFinish.y),
        xFinish: Math.max(containerStart.x, containerFinish.x),
        yFinish: Math.max(containerStart.y, containerFinish.y)
    }

    const ElemCoords = {
        xStart: Math.min(elemStart.x, elemFinish.x),
        yStart: Math.min(elemStart.y, elemFinish.y),
        xFinish: Math.max(elemStart.x, elemFinish.x),
        yFinish: Math.max(elemStart.y, elemFinish.y)
    }
    return [{x: ElemCoords.xStart, y: ElemCoords.yStart}, {x: ElemCoords.xStart, y: ElemCoords.yFinish},
        {x: ElemCoords.xFinish, y: ElemCoords.yStart}, {x: ElemCoords.xFinish, y: ElemCoords.yFinish}
    ].some(({x,y}) => x > ContCoords.xStart && x < ContCoords.xFinish && y > ContCoords.yStart && y < ContCoords.yFinish )
}

export function addToContainer(containers, addingId, elementToAdd){
    containers.map(elm => {
       if(elm.hasOwnProperty('content') || elm.hasOwnProperty('children')){
           if(elm.id === addingId){
               elm.hasOwnProperty('content') ? elm.content.push(elementToAdd) : elm.children.push(elementToAdd);
           }
           else{
               addToContainer(elm.hasOwnProperty('content') ? elm.content: elm.children, addingId, elementToAdd);
           }
       }
   })
}