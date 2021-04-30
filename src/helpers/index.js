export function randomId(){
    const LITERALS = [ '0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','g','k','l','m','n',
      'o','p','q','r','s','t','u','v','w','x','y','z','!','@','#','$','!'];
    let str = '';
    for (let i = 0; i < 20; i++){
        str+= LITERALS[Math.floor(Math.random() * 41)]
    }
    return str
}

function convertTypeView(data, resolution, customParentContainer){
    switch(data.type){
        case "container":
            return convertContainerView(data, resolution, customParentContainer);
        case "element":
            return convertElementView(data);
        case "modifier":
            return convertModifierView(data);
    }
}

function convertContainerView(data, resolution, customParentContainer){
    let startX = data.start.x;
    let startY = data.start.y;
    let finishX = data.finish.x;
    let finishY = data.finish.y;
    let LEFT;
    let TOP;
    let WIDTH;
    let HEIGHT;
    if(customParentContainer){
        const parentStartX = customParentContainer.start.x;
        const parentStartY = customParentContainer.start.y;
        const parentFinishX = customParentContainer.finish.x;
        const parentFinishY = customParentContainer.finish.y;
        LEFT = startX < finishX ? ((( startX - parentStartX) / (parentFinishX - parentStartX)) * 100) : (((finishX - parentStartX) / (parentFinishX - parentStartX)) * 100);
        TOP = startY < finishY ? (((startY - parentStartY) / (parentFinishY - parentStartY)) * 100) : (((finishY - parentStartY) / (parentFinishY - parentStartY)) * 100);
        WIDTH = Math.abs(((data.finish.x - data.start.x) / (parentFinishX - parentStartX)) * 100);
        HEIGHT =  Math.abs(((data.finish.y - data.start.y) / (parentFinishY - parentStartY)) * 100);
    }
    else {
         LEFT = startX < finishX ? (((startX / resolution.width) * 100)) : (((finishX / resolution.width) * 100));
         TOP = startY < finishY ? (((startY / resolution.height) * 100)) : (((finishY / resolution.height) * 100));
         WIDTH = Math.abs(((data.finish.x - data.start.x) / resolution.width) * 100);
         HEIGHT = Math.abs(((data.finish.y - data.start.y) / resolution.height) * 100);
    }
    const style =  {
        border:  '1px solid #000',
        position: 'absolute',
        display: 'flex',
        left: LEFT + '%',
        top: TOP + '%',
        width: WIDTH+'%',
        height: HEIGHT+'%'
    }

    return <div id={data.id} className={data.className} style={style}>
         {!!data.children.length &&  convertDataToView(data.children, resolution, {start: data.start, finish: data.finish}) }
    </div>
}

function convertElementView(data){

}

function convertModifierView(data){

}

export function convertDataToView(data, resolution, customParentContainer = null){
    return[
        data.map( x => convertTypeView(x, resolution, customParentContainer))
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