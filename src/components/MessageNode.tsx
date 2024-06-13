import { Handle, NodeProps, Position } from "reactflow";

type Props = {
    label: string;
};
function MessageNode({ data, selected }: NodeProps<Props>) {
    return (
        <div
            className={`rounded-lg shadow-xl w-52  bg-white text-black overflow-hidden text-sm border-2 ${selected ? " border-indigo-400" : " border-transparent"
                }`}
        >
            <Handle type="target" position={Position.Left} />
            <div className="bg-teal-400 px-2  py-1">Send Message</div>
            {data.label && <div className="p-2">{data.label}</div>}
            <Handle type="source" position={Position.Right} />
        </div>
    );
}

export default MessageNode;
