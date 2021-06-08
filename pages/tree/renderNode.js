import { optionMap } from './index';
export default function renderNode(node, graph) {
  if (node.depth === 0) {
    node.icon = {
      show: true,
      img: 'data:image/png;base64,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',
    };
  }
  if (node.depth === 1 || node.position === 'left') {
    node.icon = {
      show: true,
      img: 'data:image/png;base64,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',
    };
  }
  return node;
}
