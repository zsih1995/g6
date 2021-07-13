import G6 from '@antv/g6';

const itemHeight = 30;
G6.registerNode('processList', {
  draw(cfg, group) {
    const width = 250;
    const height = 300;
    const itemCount = 10;
    const boxStyle = {
      stroke: '#096DD9',
      radius: 4,
    };
    const { attrs = [], startIndex = 0, selectedIndex } = cfg;
    const list = attrs;
    const afterList = list.slice(
      Math.floor(startIndex),
      Math.floor(startIndex + itemCount - 1)
    );
    const offsetY = (0.5 - (startIndex % 1)) * itemHeight + 30;

    const keyShape = group.addShape('rect', {
      attrs: {
        fill: boxStyle.stroke,
        height: 30,
        width,
        radius: [boxStyle.radius, boxStyle.radius, 0, 0],
      },
    });

    group.addShape('text', {
      attrs: {
        y: 22,
        x: 18,
        fill: '#fff',
        text: cfg.label,
        fontSize: 12,
        fontWeight: 500,
      },
    });

    group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width,
        height,
        ...boxStyle
      },
    });

    const listContainer = group.addGroup({});
    listContainer.setClip({
      type: 'rect',
      attrs: {
        x: -8,
        y: 30,
        width: width + 16,
        height: 270,
      },
    });

    listContainer.addShape({
      type: 'rect',
      attrs: {
        x: 1,
        y: 30,
        width: width - 2,
        height: 300 - 30,
        fill: '#fff',
      },
    });

    if (list.length > itemCount) {
      const barStyle = {
        width: 4,
        padding: 0,
        boxStyle: {
          stroke: '#00000022',
        },
        innerStyle: {
          fill: '#00000022',
        },
      };

      listContainer.addShape('rect', {
        attrs: {
          y: 30,
          x: width - barStyle.padding - barStyle.width,
          width: barStyle.width,
          height: height - 30,
          ...barStyle.boxStyle,
        },
      });

      const indexHeight =
        afterList.length > itemCount
          ? (afterList.length / list.length) * height
          : 10;

      listContainer.addShape('rect', {
        attrs: {
          y: 30 + barStyle.padding + (startIndex / list.length) * (height - 30),
          x: width - barStyle.padding - barStyle.width,
          width: barStyle.width,
          height: Math.min(height, indexHeight),
          ...barStyle.innerStyle,
        },
      });
    }
    if (afterList) {
      afterList.forEach((e, i) => {
        const isSelected = Math.floor(startIndex) + i === Number(selectedIndex);
        let {label } = e;
        // const label = key.length > 26 ? key.slice(0, 24) + '...' : key;
        listContainer.addShape('rect', {
          attrs: {
            x: 1,
            y: i * itemHeight - itemHeight / 2 + offsetY,
            width: width - 4,
            height: itemHeight,
            radius: 2,
            lineWidth: 1,
            cursor: 'pointer',
          },
          name: `item-${Math.floor(startIndex) + i}-content`,
        });

        listContainer.addShape('circle', {
          attrs: {
            x: 0,
            y: i * itemHeight + offsetY,
            r: 3,
            stroke: boxStyle.stroke,
            fill: 'white',
            radius: 2,
            lineWidth: 1,
            cursor: 'pointer',
          },
        });

        listContainer.addShape('text', {
          attrs: {
            x: 12,
            y: i * itemHeight + offsetY + 6,
            text: label,
            fontSize: 12,
            fill: '#000',
            fontFamily:
              'Avenir,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
            full: e,
            fontWeight: isSelected ? 500 : 100,
            cursor: 'pointer',
          },
          name: `item-${Math.floor(startIndex) + i}`,
        });
      });
    }

    return keyShape;
  },
});
