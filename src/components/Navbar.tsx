import React from 'react'
import { useEdges, useNodes } from 'reactflow';


const Navbar = () => {

    const nodes = useNodes();
    const edges = useEdges();

    const [connectionsState, setConnectionsState] = React.useState<string>()

    const onSave = (e: React.MouseEvent) => {
        const allEdgeSource = edges.map(edge => edge.source);
        const allEdgeTarget = edges.map(edge => edge.target);

        const isConnected = nodes.every((node) => allEdgeSource.includes(node.id) || allEdgeTarget.includes(node.id));
        setConnectionsState(isConnected ? 'CONNECTED' : 'NOT_CONNECTED');

        // Clear the state after 3 seconds
        setTimeout(() => {
            setConnectionsState(undefined);
        }, 3000);
    };


    return (
        <div className='flex justify-between items-center bg-gray-200 border-b border-gray-300 text-white px-4 py-3 '>
            <div className='flex-1 flex items-center justify-center'>
                {/* notification */}
                {connectionsState && (
                    <div className={`rounded-xl px-4 py-1 ${connectionsState === 'CONNECTED' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {connectionsState === 'CONNECTED' ? 'Flow saved' : 'Cannot save Flow'}
                    </div>
                )}
            </div>
            <div>
                <button className='border-blue-500 border-2 p-1 px-6 bg-white text-black rounded-lg' onClick={onSave}>Save Changes</button>
            </div>
        </div>
    )
}

export default Navbar