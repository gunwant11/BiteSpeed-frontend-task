import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import NodeCard from "./NodeCard";
import { Node, useNodes } from "reactflow";
import { ArrowLeft } from "lucide-react";

interface INodePanal {
    setNodes: Dispatch<
        SetStateAction<Node<{ label: string }, string | undefined>[]>
    >;
}

const NodePanal: React.FC<INodePanal> = ({ setNodes }) => {
    const [selectedNode, setSelectedNode] = React.useState<null | Node>(null);
    const nodes = useNodes();

    useEffect(() => {
        const node = nodes.filter((node) => node.selected);
        if (node.length > 0) {
            setSelectedNode(node[0] as Node);
        } else {
            setSelectedNode(null);
        }
    }, [nodes]);

    const nodeChangeHandeler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newNodes = nodes.map((node: Node) => {
            if (selectedNode && node.id === selectedNode.id) {
                node.data.label = e.target.value;
            }
            return node;
        });
        setNodes(newNodes);
    };

    const handeBack = () => {
        setSelectedNode(null);
        const newNodes = nodes.map((node: Node) => {
            if (selectedNode && node.id === selectedNode.id) {
                node.selected = false;
            }
            return node;
        });
        setNodes(newNodes);
    };

    return (
        <div className=" w-[400px] border-l border-gray-300">
            {!selectedNode ? (
                <div className=" w-full  overflow-y-scroll h-[calc(100vh - 60px)] grid grid-cols-2 gap-4 p-4 no-scrollbar">
                    <NodeCard setNodes={setNodes} />
                </div>
            ) : (
                <div className=" w-full  overflow-y-scroll h-[calc(100vh-60px)]  ">
                    <div className="border-b border-gray-300 p-2 py-4 flex">
                        {" "}
                        <ArrowLeft size={22} onClick={handeBack} />{" "}
                        <span className="flex-1 text-center">Message</span>
                    </div>
                    <div className="p-4">
                        <div className="flex  flex-col justify-between gap-3 ">
                            <span className="text-gray-500 text-sm  border-b pb-2">
                                Label
                            </span>
                            <textarea
                                className="border border-gray-300 p-2 rounded-lg w-[300px] text-sm"
                                value={selectedNode.data.label}
                                defaultValue={selectedNode.data.label}
                                onChange={nodeChangeHandeler}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NodePanal;
