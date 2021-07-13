const data = [];
const edges = [];
export const data200 = [];

for (let i = 0; i < 20; i++) {
  data.push({
    id: i,
    label: `No-${i}.exe`,
    position: 'right',
    relation: {
      source: 'writeFile',
      target: String(i),
      sourceKey: 'writeFile',
      targetKey: 'writeFileChild',
    },
  });
  edges.push({
    id: `writeFile:${i}`,
    source: 'writeFile',
    target: 'writeFileChild',
    sourceKey: 'writeFile',
    targetKey: String(i),
  });
}
for (let i = 0; i < 200; i++) {
  data200.push({
    id: i,
    label: `No-${i}.exe`,
    position: 'right',
  });
}

// console.log(data)
const result = {
  nodes: [
    {
      id: 'writeFileChild',
      label: 'writeFileChild',
      attrs: data,
      position: 'right',
    },
  ],
  edges,
};
export default result;
