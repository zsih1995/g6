import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6';
import renderNode from './renderNode';

const treeData = {
  id: 'root',
  label: 'Word.exe',
  children: [
    {
      id: 'SubTreeNode1',
      label: 'subroot1',
      position: 'left',
      children: [
        {
          id: 'SubTreeNode1.1',
          position: 'left',
          label: 'subroot1.1',
        },
      ],
    },
    {
      id: 'a1',
      label: 'a1',
      position: 'left',
      children: [
        {
          id: 'a1.1',
          position: 'left',
          label: 'a1.1',
        },
      ],
    },
    {
      id: 'a2',
      label: 'a2',
      position: 'left',
      children: [
        {
          id: 'a2.1',
          position: 'left',
          label: 'a2.1',
        },
      ],
    },
    {
      id: 'writeFile',
      label: '写入文件',
      position: 'right',
      children: [
        {
          id: 'SubTreeNode2.1',
          position: 'right',
          label: 'subroot2.1',
        },
        {
          id: 'SubTreeNode2.2',
          position: 'right',
          label: 'subroot2.2',
        },
      ],
    },
    {
      id: 'createFile',
      label: '创建文件',
      position: 'right',
      children: [
        {
          id: 'SubTreeNode3.1',
          position: 'right',
          label: 'subroot2.1',
        },
        {
          id: 'SubTreeNode3.2',
          position: 'right',
          label: 'subroot2.2',
        },
      ],
    },
    {
      id: 'writeProcess',
      label: '写入进程',
      position: 'right',
      children: [
        {
          id: 'SubTreeNode4.1',
          position: 'right',
          label: 'subroot2.1',
        },
        {
          id: 'SubTreeNode4.2',
          position: 'right',
          label: 'subroot2.2',
        },
      ],
    },
  ],
};
const optionMap = [
  'createFile',
  'writeFile',
  'writeProcess',
  'createProcess',
  'networkConnect',
];
const TreeGraphReact = () => {
  const ref = React.useRef(null);
  let graph = null;

  useEffect(() => {
    if (!graph) {
      const miniMap = new G6.Minimap();
      graph = new G6.TreeGraph({
        fitView: true,
        container: ref.current,
        width: 1200,
        height: 500,
        modes: {
          default: [
            'drag-canvas',
            'zoom-canvas',
            {
              type: 'collapse-expand',
              trigger: 'click',
              // onChange(item,collapsed){
              //   console.log(item,collapsed)
              // }
              shouldBegin: (e) => {
                console.log(e.item.getModel())
                if (optionMap.includes(e.item.getID())) {
                  return true;
                } else {
                  return false;
                }
              }
            },
          ],
        },
        defaultEdge: {
          type: 'cubic-horizontal',
          style: {
            stroke: '#bec3cb',
          },
        },
        defaultNode: {
          size: 18,
          labelCfg: {
            position: 'bottom',
            style: {
              fill: '#000000A6',
              fontSize: 10,
            },
          },
          style: {
            stroke: '#72CC4A',
            width: 150,
          },
        },
        layout: {
          type: 'mindmap', // 布局类型
          direction: 'H', // 自左至右布局，可选的有 H / V / LR / RL / TB / BT
          // getHGap: d=>50,      // 每个节点的水平间隙，默认 18
          // getVGap: d=>20,      // 每个节点的垂直间隙
          getSide: (d) => d.data.position,
        },
        plugins: [miniMap],
      });
    }
    graph.node((node) => renderNode(node));
    graph.on('itemcollapsed',e=>{
      console.log(e)
    })
    graph.data(treeData);
    graph.render();
  }, []);

  return <div ref={ref}></div>;
};

export default TreeGraphReact;
