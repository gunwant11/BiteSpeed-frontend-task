import { type NodeTypes } from "reactflow";
import MessageNode from "../components/MessageNode";

export const nodeTypes = {
    "text-message": MessageNode,
} satisfies NodeTypes;
