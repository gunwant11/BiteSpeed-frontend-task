import { useCallback } from 'react';
import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  BackgroundVariant,
} from "reactflow";
import { useDrop } from 'react-dnd'

import 'reactflow/dist/style.css';

import Navbar from './components/Navbar';
import NodePanal from './components/NodePanal';
import { initialNodes, nodeTypes } from './nodes';
import { initialEdges } from './edges';

export default function App() {


  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => {
      const { source } = params;
      // for one node source can only have one edge
      const existingEdge = edges.find((edge) => edge.source === source);
      if (existingEdge) {
        return;
      }
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges, edges]
  );

  const [, drop] = useDrop(() => ({
    accept: 'node',
    drop: (_, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const dropResult = { x: clientOffset?.x, y: clientOffset?.y };
      return dropResult;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <ReactFlowProvider>
      <div style={{ width: '100vw', height: '100vh' }} className='flex flex-col'>
        <Navbar />
        <div className='flex w-full h-full'>
          <div style={{ width: '100%', height: '100%' }} ref={drop}>

            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
            >
              <Controls />
              <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
          </div>

          <NodePanal setNodes={setNodes} />
        </div>
      </div>
    </ReactFlowProvider>
  );
}