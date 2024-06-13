import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Node, Edge, NodeTypes } from "reactflow";

import type { RootState } from './store'
import { PositionLoggerNode } from '../nodes/PositionLoggerNode';



export const initialNodes = [
    { id: "a", type: "input", position: { x: 0, y: 0 }, data: { label: "wire" } },
    {
        id: "b",
        type: "position-logger",
        position: { x: -100, y: 100 },
        data: { label: "drag me!" },
    },
    { id: "c", position: { x: 100, y: 100 }, data: { label: "your ideas" } },
    {
        id: "d",
        type: "output",
        position: { x: 0, y: 200 },
        data: { label: "with React Flow" },
    },
] satisfies Node[];

import type { Edge, EdgeTypes } from "reactflow";

export const initialEdges = [
    { id: "a->c", source: "a", target: "c", animated: true },
    { id: "b->d", source: "b", target: "d" },
    // { id: "c->d", source: "c", target: "d", animated: true },
] satisfies Edge[];

export const edgeTypes = {
    // Add your custom edge types here!
} satisfies EdgeTypes;


export const nodeTypes = {
    "position-logger": PositionLoggerNode,
    // Add any of your custom nodes here!
} satisfies NodeTypes;



type NodeState = {
    nodes: Node[],
    edges: Edge[],
}

const initialState: NodeState = {
    nodes: initialNodes,
    edges: initialEdges,
}

export const NodeSlice = createSlice({
    name: 'nodes',
    initialState,
    reducers: {
        addNode(state, action: PayloadAction<Node>) {
            state.nodes.push(action.payload)
        },
        addEdge(state, action: PayloadAction<Edge>) {
            state.edges.push(action.payload)
        },
    },
})

// actions 
export const { addNode, addEdge } = NodeSlice.actions


// selectors
export const selectNodes = (state: RootState) => state.nodes.nodes
export const selectEdges = (state: RootState) => state.nodes.edges

// reducer
export default NodeSlice.reducer