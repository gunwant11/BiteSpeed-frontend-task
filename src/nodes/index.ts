import { Position, type Node, type NodeTypes } from "reactflow";
import MessageNode from "./MessageNode";

export const initialNodes = [
    {
        id: "a",
        type: "text-message",
        position: { x: 0, y: 0 },
        data: { label: "wire" },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "b",
        type: "text-message",
        position: { x: 200, y: 100 },
        data: { label: "drag me!" },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "c",
        type: "text-message",
        position: { x: 100, y: 100 },
        data: { label: "your ideas" },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: "d",
        type: "text-message",
        position: { x: 0, y: 200 },
        data: { label: "with React Flow" },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
] satisfies Node[];

export const nodeTypes = {
    "text-message": MessageNode,
} satisfies NodeTypes;
