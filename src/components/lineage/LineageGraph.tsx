import {
    MiniMap,
    Controls,
    Background,
    ReactFlow,
    ReactFlowProps,
    useReactFlow,
    useNodesInitialized,
    BackgroundVariant,
    Edge,
    Node,
} from "@xyflow/react";
import { DatasetNode, JobNode } from "./nodes";
import { MouseEvent, useLayoutEffect } from "react";
import { BaseEdge, IOEdge, ColumnLineageEdge } from "./edges";
import useLineageSelectionProvider from "./selection/useLineageSelectionProvider";
import LineageSelectionContext from "./selection/LineageSelectionContext";
import { getAllNodeRelations } from "./selection/utils/nodeSelection";
import {
    getNearestEdgeRelations,
    getAllEdgeRelations,
} from "./selection/utils/edgeSelection";
import { isSubgraphSelected } from "./selection/utils/common";

export const MIN_ZOOM_VALUE = 0.1;
export const MAX_ZOOM_VALUE = 2.5;

const edgeTypes = {
    ioEdge: IOEdge,
    columnLineageEdge: ColumnLineageEdge,
    baseEdge: BaseEdge,
};

const nodeTypes = {
    datasetNode: DatasetNode,
    jobNode: JobNode,
};

const LineageGraph = (props: ReactFlowProps) => {
    const { fitView, getEdges } = useReactFlow();
    const nodesInitialized = useNodesInitialized();

    const lineageSelection = useLineageSelectionProvider();
    const { selection, setSelection, resetSelection } = lineageSelection;

    const onEdgeClick = (e: MouseEvent, edge: Edge) => {
        const selection = getNearestEdgeRelations(edge);
        setSelection(selection);
        e.stopPropagation();
    };

    const onEdgeDoubleClick = (e: MouseEvent, edge: Edge) => {
        const selection = getAllEdgeRelations(getEdges(), edge);
        setSelection(selection);
        e.stopPropagation();
    };

    const onNodeClick = (e: MouseEvent, node: Node) => {
        setSelection({
            nodeWithHandles: new Map([[node.id, new Set<string>()]]),
            edges: new Set(),
        });
        e.stopPropagation();
    };

    const onNodeDoubleClick = (e: MouseEvent, node: Node) => {
        const selection = getAllNodeRelations(getEdges(), node.id);
        setSelection(selection);
        e.stopPropagation();
    };

    const onPaneClick = (e: MouseEvent) => {
        resetSelection();
        e.stopPropagation();
    };

    useLayoutEffect(() => {
        fitView();
    }, [nodesInitialized]);

    return (
        <LineageSelectionContext.Provider value={lineageSelection}>
            <ReactFlow
                className={
                    isSubgraphSelected(selection)
                        ? "subgraphSelected"
                        : undefined
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
                onEdgeClick={onEdgeClick}
                onEdgeDoubleClick={onEdgeDoubleClick}
                onNodeClick={onNodeClick}
                onNodeDoubleClick={onNodeDoubleClick}
                onPaneClick={onPaneClick}
                // hide console warnings about edges with missing endpoint nodes
                // https://github.com/xyflow/xyflow/issues/5085
                onError={() => {}}
                {...props}
            >
                <Background variant={BackgroundVariant.Dots} />
                <Controls />
                <MiniMap pannable zoomable />
            </ReactFlow>
        </LineageSelectionContext.Provider>
    );
};

export default LineageGraph;
