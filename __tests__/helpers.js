import {walkTree, conditionInContainerHandler} from "../src/helpers"

describe('walk tree',() =>{
  it('walk add',() =>{
    const id = walkTree(
      [{
            actualResolution: {width: 1228, height: 691},
            children: [],
            className: "sadf",
            finish: {x: 807.2000122070312, y: 493},
            id: "f4zxs0ewc5z!yllrexia",
            properties: [],
            start: {x: 73.5999984741211, y: 49.80000305175781},
            type: "container"
        }],
        conditionInContainerHandler,
        {
          actualResolution: {width: 1228, height: 691},
          children: [],
          className: "asdf",
          finish: {x: 529.6000366210938, y: 343.3999938964844},
          id: "ayxg37#yplf$7$d2erla",
          properties: [],
          start: {x: 160, y: 111.40000915527344},
          type: "container",
        },
        "xlntrih@r2xo#801yl##"
    )
    expect(id).toEqual("f4zxs0ewc5z!yllrexia")
  })
})