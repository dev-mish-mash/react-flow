import { Easing, Tween } from 'es6-tween';
import React, { useState } from 'react';

import ReactFlow, { addEdge, Background, ReactFlowProvider, useZoomPanHelper, useStore } from 'react-flow-renderer';

const initialElements = [
  { id: '1', type: 'input', data: { label: 'Smooth Transition' }, position: { x: 250, y: 5 } },
  { id: '2', type: 'output', data: { label: 'Scroll it!' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'applied to zoom / fit-view' }, position: { x: 400, y: 100 } },
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
];

const SmoothTranstion = () => {
  const store = useStore();
  const [rfInstance, setRfInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  const onLoad = instance => {
    instance.fitView();
    setRfInstance(instance);
  }

  console.log(store);
  // const handleZoomIn = () => {
  //   new Tween()
  // }

  return (
    <ReactFlow
      elements={elements}
      onConnect={onConnect}
      onLoad={onLoad}
    >
      <div style={{ position: 'absolute', left: 10, top: 10, zIndex: 4 }}>
        <button>zoom in</button>
        <button>zoom out</button>
        <button>fit view</button>
      </div>
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default SmoothTranstion;
