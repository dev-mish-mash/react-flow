import { Easing, Tween, autoPlay } from 'es6-tween';
import React, { useState } from 'react';

import ReactFlow, { addEdge, Background } from 'react-flow-renderer';

// 
autoPlay(true);

// set a transition time in miliseconds 
const TRANSITION_TIME = 300;

const initialElements = [
  { id: '1', type: 'input', data: { label: 'Smooth Transition' }, position: { x: 250, y: 5 } },
  { id: '2', type: 'output', data: { label: 'zoom' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'fit-view' }, position: { x: 400, y: 100 } },
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
];

const SmoothTranstion = () => {
  const [rfInstance, setRfInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  const onLoad = instance => {
    instance.fitView();
    setRfInstance(instance);
  }

  const handleZoom = (ratio) => () => {
    const zoom = rfInstance.toObject().zoom;
    new Tween({ zoom: zoom })
      .to({ zoom: zoom * ratio }, TRANSITION_TIME)
      .easing(Easing.Quadratic.Out)
      .on('update', ({ zoom }) => {
        rfInstance.zoomTo(zoom)
      })
      .start();
  }

  const animateFitView = (tgtTransform) => {
    const { position: [x, y], zoom } = rfInstance.toObject();

    new Tween({ zoom: zoom, x: x, y: y })
      .to({ zoom: tgtTransform.zoom, x: tgtTransform.x, y: tgtTransform.y }, TRANSITION_TIME)
      .easing(Easing.Quadratic.Out)
      .on('update', ({ x, y, zoom }) => {
        rfInstance.setTransform({ x, y, zoom })
      })
      .start();
  }

  const handleFitView = () => {
    rfInstance.fitView({ animate: animateFitView, padding: 0.1 })
  }
  return (
    <ReactFlow
      elements={elements}
      onConnect={onConnect}
      onLoad={onLoad}
    >
      <div style={{ position: 'absolute', left: 10, top: 10, zIndex: 4 }}>
        <button onClick={handleZoom(1.2)}>zoom in</button>
        <button onClick={handleZoom(1 / 1.2)}>zoom out</button>
        <button onClick={handleFitView}>fit-view</button>
      </div>
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default SmoothTranstion;
