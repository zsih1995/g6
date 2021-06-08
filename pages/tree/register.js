import G6 from '@antv/g6'

G6.registerNode('processList',{
  draw(cfg,group){
    console.log(1111,cfg,group)
    const keyShape = group.addShape('rect',{
      attrs:{
        x: 0,
        y: 0,
        width:70,
        height: 30,
        radius:5,
        stroke:'#72CC4A',
        lineWidth: 0.6,
        fillOpacity: 1,
        fill: '#fff'
      },
    })
    return keyShape
  },
},'single-shape')