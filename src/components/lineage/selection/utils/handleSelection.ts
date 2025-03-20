import { Edge } from "@xyflow/react";
import {
    getAllConnections,
    mergeSelection,
    LineageSelection,
    splitEdges,
} from "./common";

export const getNearestHandleRelations = (
    edges: Edge[],
    nodeId: string,
    handle: string,
): LineageSelection => {
    // For specific node and handle return only nearest edges and their handles.

    const connectedEdges = edges.filter(
        (edge) =>
            (edge.source === nodeId && edge.sourceHandle === handle) ||
            (edge.target === nodeId && edge.targetHandle === handle),
    );

    const result: LineageSelection = {
        nodeWithHandles: new Map(),
        edges: new Set(connectedEdges.map((edge) => edge.id)),
    };

    connectedEdges.forEach((edge) => {
        const handles =
            result.nodeWithHandles.get(edge.source) ?? new Set<string>();
        if (edge.sourceHandle) {
            handles.add(edge.sourceHandle);
        }
        result.nodeWithHandles.set(edge.source, handles);
    });

    connectedEdges.forEach((edge) => {
        const handles =
            result.nodeWithHandles.get(edge.target) ?? new Set<string>();
        if (edge.targetHandle) {
            handles.add(edge.targetHandle);
        }
        result.nodeWithHandles.set(edge.target, handles);
    });

    return result;
};

export const getAllHandleRelations = (
    edges: Edge[],
    nodeId: string,
    handle: string,
): LineageSelection => {
    // For specific node and handle return all connected edges and nodes, recursively.

    const { edgesBySource, edgesByTarget } = splitEdges(edges);

    // walk `source -> edge - target`
    const downstreams = getAllConnections(
        nodeId,
        new Set([handle]),
        edgesBySource,
        "outgoing",
    );
    // same, but in opposite direction
    const upstreams = getAllConnections(
        nodeId,
        new Set([handle]),
        edgesByTarget,
        "incoming",
    );

    return mergeSelection(upstreams, downstreams);
};
