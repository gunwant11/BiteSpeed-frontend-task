import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import NodeCard from "./NodeCard";
import { Node, useNodes } from "reactflow";
import SettingsPanal from "./SettingsPanal";

interface INodePanal {
    setNodes: Dispatch<
        SetStateAction<Node<{ label: string }, string | undefined>[]>
    >;
}

const NodePanal: React.FC<INodePanal> = ({ setNodes }) => {
    const [selectedNode, setSelectedNode] = React.useState<null | Node>(null);
    const nodes = useNodes();

    useEffect(() => {
        if (!nodes || nodes.length === 0) {
            setSelectedNode(null);
            return;
        }
        const selectedNode = nodes.find((node) => node.selected) || null;
        setSelectedNode(selectedNode as Node | null);
    }, [nodes]);

    return (
        <div className=" w-[400px] border-l border-gray-300">
            {!selectedNode ? (
                <div className=" w-full  overflow-y-scroll h-[calc(100vh - 60px)] grid grid-cols-2 gap-4 p-4 no-scrollbar">
                    <NodeCard setNodes={setNodes} />
                </div>
            ) : (
                <SettingsPanal setNodes={setNodes} selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
            )}
        </div>
    );
};

export default NodePanal;
