import {
    MiniMap,
    Controls,
    Background,
    ReactFlow,
    ReactFlowProps,
    useReactFlow,
    useNodesInitialized,
    BackgroundVariant,
} from "@xyflow/react";
import { DatasetNode, JobNode, RunNode, OperationNode } from "./nodes";
import { useEffect } from "react";
import { BaseEdge, IOEdge } from "./edges";
import { useLineageSelection } from "./selection";

export const MIN_ZOOM_VALUE = 0.1;
export const MAX_ZOOM_VALUE = 2.5;

const edgeTypes = {
    ioEdge: IOEdge,
    baseEdge: BaseEdge,
};

const nodeTypes = {
    datasetNode: DatasetNode,
    jobNode: JobNode,
    runNode: RunNode,
    operationNode: OperationNode,
};

const LineageGraph = (props: ReactFlowProps) => {
    const { fitView } = useReactFlow();
    const lineageSelection = useLineageSelection();

    const nodesInitialized = useNodesInitialized();

    useEffect(() => {
        fitView();
    }, [nodesInitialized]);

    return (
        <ReactFlow
            className={
                lineageSelection.hideNonSelected ? "hideNonSelected" : undefined
            }
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            nodesFocusable={true}
            elementsSelectable={true}
            nodesConnectable={false}
            nodesDraggable={true}
            panOnScroll={false}
            panOnDrag={true}
            minZoom={MIN_ZOOM_VALUE}
            maxZoom={MAX_ZOOM_VALUE}
            zoomOnScroll={true}
            zoomOnPinch={true}
            zoomOnDoubleClick={false}
            fitView
            onDoubleClick={() => fitView()}
            onPaneClick={lineageSelection.onPaneClick}
            onEdgeClick={lineageSelection.onEdgeClick}
            onNodeClick={lineageSelection.onNodeClick}
            onEdgeDoubleClick={lineageSelection.onEdgeDoubleClick}
            onNodeDoubleClick={lineageSelection.onNodeDoubleClick}
            {...props}
        >
            <Background variant={BackgroundVariant.Dots} />
            <Controls />
            <MiniMap pannable zoomable />
        </ReactFlow>
    );
};

export default LineageGraph;
