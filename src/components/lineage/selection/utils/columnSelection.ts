import { Edge } from "@xyflow/react";
import {
    getAllConnections,
    mergeSelection,
    LineageSelection,
    splitEdges,
} from "./common";

export const getNearestColumnRelations = (
    edges: Edge[],
    nodeId: string,
    fieldName: string,
): LineageSelection => {
    // For specific node and column return only nearest edges and their columns.

    const connectedEdges = edges.filter(
        (edge) =>
            (edge.source === nodeId && edge.sourceHandle === fieldName) ||
            (edge.target === nodeId && edge.targetHandle === fieldName),
    );

    const result: LineageSelection = {
        nodeWithColumns: new Map(),
        edges: new Set(connectedEdges.map((edge) => edge.id)),
    };

    connectedEdges.forEach((edge) => {
        const columns =
            result.nodeWithColumns.get(edge.source) ?? new Set<string>();
        if (edge.sourceHandle) {
            columns.add(edge.sourceHandle);
        }
        result.nodeWithColumns.set(edge.source, columns);
    });

    connectedEdges.forEach((edge) => {
        const columns =
            result.nodeWithColumns.get(edge.target) ?? new Set<string>();
        if (edge.targetHandle) {
            columns.add(edge.targetHandle);
        }
        result.nodeWithColumns.set(edge.target, columns);
    });

    return result;
};

export const getAllColumnRelations = (
    edges: Edge[],
    nodeId: string,
    fieldName: string,
): LineageSelection => {
    // For specific node and column return all connected edges and nodes, recursively.

    const { edgesBySource, edgesByTarget } = splitEdges(edges);

    // walk `source -> edge - target`
    const downstreams = getAllConnections(
        nodeId,
        new Set([fieldName]),
        edgesBySource,
        "outgoing",
    );
    // same, but in opposite direction
    const upstreams = getAllConnections(
        nodeId,
        new Set([fieldName]),
        edgesByTarget,
        "incoming",
    );

    return mergeSelection(upstreams, downstreams);
};
