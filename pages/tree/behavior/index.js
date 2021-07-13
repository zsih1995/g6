import G6 from '@antv/g6';
import { pathSet, optionMap } from '../index';
G6.registerBehavior('handle-tag', {
  getEvents() {
    return {
      'node:click': 'onNodeClick',
    };
  },

  onNodeClick(evt) {
    // console.log(evt);
    const { graph } = this;
    const { item } = evt;
    const { id } = item._cfg;
    //
    const optionNodes = graph.findAll(
      'node',
      (node) => optionMap.indexOf(node._cfg.id) > -1
    );
    //点击根节点
    if (id === 'root') {
      return;
    }
    //点击右侧节点
    if (optionMap.indexOf(id) > -1) {
      optionNodes.map((it) => {
        it.setState('active', false);
      });
      item.setState('active', true);
    } else {
      //点击左侧节点
      pathSet.map((it) => {
        it.map(its=>{
          graph.findById(its).setState('active',false)
        })
        if (it.indexOf(id) > -1) {
          //捆绑选定一条链路
          const activeArr = graph.findAll(
            'node',
            (node) => it.indexOf(node._cfg.id) > -1
          );
          activeArr.map((it) => {
            it.setState('active', true);
          });
        }
      });
    }
  },
});
