import type { Edge, EdgeTypes } from "reactflow";

export const initialEdges = [
    { id: "a->c", source: "a", target: "c", animated: true },
    { id: "b->d", source: "b", target: "d" },
] satisfies Edge[];

export const edgeTypes = {
    // Add your custom edge types here!
} satisfies EdgeTypes;
