export function randomId(){
    const LITERALS = [ '0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','g','k','l','m','n',
      'o','p','q','r','s','t','u','v','w','x','y','z','!','@','#','$','!'];
    let str = '';
    for (let i = 0; i < 20; i++){
        str+= LITERALS[Math.floor(Math.random() * 41)]
    }
    return str
}

function convertTypeView(data,displayHTML, customParentContainer){
    switch(data.type){
        case "container":
            return displayHTML(data, customParentContainer);
        case "element":
            return displayHTML(data, customParentContainer);
        case "modifier":
            return displayHTML(data);
    }
}

export function partesStyles(type, coordes){
    const {LEFT, TOP, WIDTH, HEIGHT} = coordes
    if(type === "container"){
        return {
            border:  '1px solid #000',
            position: 'absolute',
            display: 'flex',
            left: LEFT + '%',
            top: TOP + '%',
            width: WIDTH+'%',
            height: HEIGHT+'%'
        }
    }
    else if(type === "element"){
        return {
            border:  '1px solid red',
            position: 'absolute',
            display: 'flex',
            left: LEFT + '%',
            top: TOP + '%',
            width: WIDTH+'%',
            height: HEIGHT+'%'
        }
    }
}


function convertModifierView(data){

}

export function convertDataToView(data, displayHTML, customParentContainer = null){
    return[
        data.map( x => convertTypeView(x,displayHTML, customParentContainer))
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

export function conditionInContainerHandler({start: containerStart, finish: containerFinish, type , actualResolution: containerResolution}, {start: elemStart, finish: elemFinish, actualResolution: elementResolution}){
    if (type !== "container") return false
    const ContCoords = {
        xStart: Math.min(containerStart.x, containerFinish.x) * (elementResolution.width/containerResolution.width),
        yStart: Math.min(containerStart.y, containerFinish.y) * (elementResolution.height/containerResolution.height),
        xFinish: Math.max(containerStart.x, containerFinish.x) * (elementResolution.width/containerResolution.width),
        yFinish: Math.max(containerStart.y, containerFinish.y) * (elementResolution.height/containerResolution.height)
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