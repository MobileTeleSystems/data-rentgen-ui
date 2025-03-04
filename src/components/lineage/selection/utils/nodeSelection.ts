import { Edge } from "@xyflow/react";
import {
    getAllConnections,
    mergeSelection,
    LineageSelection,
    splitEdges,
} from "./common";

export const getAllNodeRelations = (
    edges: Edge[],
    nodeId: string,
): LineageSelection => {
    // For specific node return all connected edges and nodes, recursively.

    // Convert list to maps to use O(1) lookups
    const { edgesBySource, edgesByTarget } = splitEdges(edges);

    // walk `source -> edge -> target`
    const downstreams = getAllConnections(
        nodeId,
        new Set(),
        edgesBySource,
        "outgoing",
    );
    const upstreams = getAllConnections(
        nodeId,
        new Set(),
        edgesByTarget,
        "incoming",
    );

    return mergeSelection(downstreams, upstreams);
};
