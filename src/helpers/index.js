export function randomId(){
    const LITERALS = [ '0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','g','k','l','m','n',
      'o','p','q','r','s','t','u','v','w','x','y','z','!','@','#','$','!'];
    let str = '';
    for (let i = 0; i < 12; i++){
        str+= LITERALS[Math.floor(Math.random() * 41)]
    }
    return str
}

function convertTypeView(data){
    switch(data.type){
        case "container":
            return convertContainerView(data);
        case "element":
            return convertElementView(data);
        case "modifier":
            return convertModifierView(data);
    }
}

function convertContainerView(data){
    const style = {
        border:  '1px solid #000'
    }
}

function convertElementView(data){

}

function convertModifierView(data){

}

export function convertDataToView(data){
    debugger
    return[
        data.map( x => convertTypeView(x))
    ]
}