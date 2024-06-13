import { MessageCircleMore } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { useDrag } from 'react-dnd'
import { Node, Position, useReactFlow } from "reactflow";

import { v4 as uuidv4 } from 'uuid';
interface DropResult {
    name: string
}
interface INodeCard {
    setNodes: Dispatch<
        SetStateAction<Node<{ label: string }, string | undefined>[]>
    >;
}

const NodeCard: React.FC<INodeCard> = ({ setNodes }) => {


    const { screenToFlowPosition } = useReactFlow();
    const createNode = (name: string, positionX: number, positionY: number) => {

        console.log(name, positionX, positionY)

        const newNode: Node = {
            id: uuidv4(),
            type: 'text-message',
            position: screenToFlowPosition({
                x: positionX,
                y: positionY,
            }),
            data: { label: name },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        };
        setNodes((nds) => nds.concat(newNode));
    }




    const [, drag] = useDrag(() => ({
        type: 'node',
        item: { name: 'New message', type: 'node' },
        end: (item: DropResult, monitor) => {
            const dropResult: { x: number, y: number } | null = monitor.getDropResult()
            console.log(dropResult)
            if (item && dropResult) {
                createNode(item.name, dropResult.x, dropResult.y)
            }
        },
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId(),
        }),
    }))

    return (
        <div className=" rounded border border-blue-500 text-blue-500 bg-white h-20 grid place-items-center" ref={drag}>
            <div className="flex flex-col justify-center items-center  gap-1">
                <MessageCircleMore /> <span>Message</span>
            </div>
        </div>
    );
};

export default NodeCard;
