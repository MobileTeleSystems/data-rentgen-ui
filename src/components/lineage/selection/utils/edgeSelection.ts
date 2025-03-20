import { Edge } from "@xyflow/react";
import {
    getAllConnections,
    mergeSelection,
    LineageSelection,
    splitEdges,
} from "./common";

export const getNearestEdgeRelations = (edge: Edge): LineageSelection => {
    // For specific edge return connected nodes and handles (if any).

    return {
        nodeWithHandles: new Map<string, Set<string>>([
            [
                edge.source,
                new Set([edge.sourceHandle].filter((field) => field != null)),
            ],
            [
                edge.target,
                new Set([edge.targetHandle].filter((field) => field != null)),
            ],
        ]),
        edges: new Set<string>([edge.id]),
    };
};

export const getAllEdgeRelations = (
    edges: Edge[],
    edge: Edge,
): LineageSelection => {
    // For specific edge return all connected nodes and edges, recursively.

    const { edgesBySource, edgesByTarget } = splitEdges(edges);

    // walk `source -> edge -> target`, recursively,
    // keep in mind handle name of the edge
    const downstreams = getAllConnections(
        edge.target,
        new Set([edge.targetHandle].filter((field) => field != null)),
        edgesBySource,
        "outgoing",
    );
    // same, but in opposite direction
    const upstreams = getAllConnections(
        edge.source,
        new Set([edge.sourceHandle].filter((field) => field != null)),
        edgesByTarget,
        "incoming",
    );

    const result = mergeSelection(downstreams, upstreams);
    result.edges.add(edge.id);
    return result;
};
