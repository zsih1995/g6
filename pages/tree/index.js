import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6';
import renderNode from './renderNode';
import renderEdge from './renderEdge';
import './behavior';
import './registerNode';
import './registerEdge';
import bigData, { data200 } from '../bigData';

const treeData = {
  id: 'root',
  label: 'Word.exe',
  children: [
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
      id: 'a3',
      label: 'a3',
      position: 'left',
      children: [
        {
          id: 'a3.1',
          position: 'left',
          label: 'a3.1',
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
      children: data200,
    },
    {
      id: 'createFile',
      label: '创建文件',
      position: 'right',
    },
    {
      id: 'writeProcess',
      label: '写入进程',
      position: 'right',
    },
  ],
  edges: bigData.edges,
};
function transArr(arr, logArr = []) {
  logArr.push(arr.id);
  if (arr.children) {
    transArr(arr.children[0], logArr);
  }
  return logArr;
}
const leftArr = treeData.children.filter((it) => it.position === 'left');
export const pathSet = leftArr.map((it) => transArr(it));
export const optionMap = [
  'createFile',
  'writeFile',
  'writeProcess',
  'createProcess',
  'networkConnect',
];
const TreeGraphReact = () => {
  const ref = React.useRef(null);
  let graph = null;
  const container = document.getElementById('container');
  const width = container.scrollWidth;
  const height = container.scrollHeight || 600;
  // const height = window.innerHeight

  useEffect(() => {
    if (!graph) {
      const miniMap = new G6.Minimap();
      graph = new G6.TreeGraph({
        fitView: true,
        container: ref.current,
        width,
        height,
        modes: {
          default: [
            'handle-tag',
            'drag-canvas',
            'zoom-canvas',
            // {
            //   type:'activate-relations',
            //   trigger:'click',
            //   shouldUpdate(e){
            //     console.log(e)
            //     return true
            //   }
            // }
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
          getVGap: (d) => {
            if (typeof d.id === 'number') {
              return 5;
            } else {
              return 50;
            }
          }, // 每个节点的垂直间隙
          getSide: (d) => d.data.position,
        },
        plugins: [miniMap],
      });
    }
    // graph.on('node:click', (e) => {
    //   console.log(e.item.id);
    // });
    graph.data(treeData);
    graph.node((node) => renderNode(node, graph));
    // graph.render();
    // treeData.edges.map((it) => {
    //   // console.log(it);
    //   graph.addItem('edge', it);
    // });
    // graph.edge((edge) => renderEdge(edge, graph));
    graph.render();
  }, []);

  return <div ref={ref}></div>;
};

export default TreeGraphReact;
