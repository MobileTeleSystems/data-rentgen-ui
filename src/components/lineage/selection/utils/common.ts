import { Edge } from "@xyflow/react";

const mergeSets = <T>(set1: Set<T>, set2: Set<T>): Set<T> => {
    // [...set1, ...set2] is not available in old browsers, using a workaround
    const result = new Set<T>();
    set1.forEach((value) => result.add(value));
    set2.forEach((value) => result.add(value));
    return result;
};

const mergeMaps = <K, V>(
    map1: Map<K, Set<V>>,
    map2: Map<K, Set<V>>,
): Map<K, Set<V>> => {
    // [...map1, ...map2] is not available in old browsers, using a workaround.
    // Also values are collections which should be merged too.
    const result = new Map<K, Set<V>>();

    map1.forEach((newValues, key) => {
        const existingValues = result.get(key) ?? new Set<V>();
        result.set(key, mergeSets(existingValues, newValues));
    });
    map2.forEach((newValues, key) => {
        const existingValues = result.get(key) ?? new Set<V>();
        result.set(key, mergeSets(existingValues, newValues));
    });
    return result;
};

export type LineageSelection = {
    // empty column set means select the entire node
    nodeWithColumns: Map<string, Set<string>>;
    edges: Set<string>;
};

type SplitEdgesResult = {
    edgesBySource: Map<string, Edge[]>;
    edgesByTarget: Map<string, Edge[]>;
};

export const splitEdges = (edges: Edge[]): SplitEdgesResult => {
    // Convert list to maps to use O(1) lookups
    const edgesBySource = new Map<string, Edge[]>();
    const edgesByTarget = new Map<string, Edge[]>();
    edges.forEach((edge) => {
        const sameSource = edgesBySource.get(edge.source) ?? [];
        sameSource.push(edge);
        edgesBySource.set(edge.source, sameSource);

        const sameTarget = edgesByTarget.get(edge.target) ?? [];
        sameTarget.push(edge);
        edgesByTarget.set(edge.target, sameTarget);
    });

    return { edgesBySource, edgesByTarget };
};

export const getAllConnections = (
    startNodesId: string,
    startNodeColumns: Set<string>,
    edgesByNodeId: Map<string, Edge[]>,
    direction: "incoming" | "outgoing",
): LineageSelection => {
    // Iterate over edges connected to specific node.
    // If startNodeColumns is passed, select only edges with specified sourceHandle/targetHandle.
    // Go to connected source/target nodes by these edges. Recursively.
    // Return all visited nodes, columns and edges.

    let edgeNodeAttribute: "source" | "target";
    let directNodeHandle: "sourceHandle" | "targetHandle";
    let reverseNodeHandle: "sourceHandle" | "targetHandle";
    if (direction == "incoming") {
        edgeNodeAttribute = "source";
        directNodeHandle = "targetHandle";
        reverseNodeHandle = "sourceHandle";
    } else {
        edgeNodeAttribute = "target";
        directNodeHandle = "sourceHandle";
        reverseNodeHandle = "targetHandle";
    }

    const result: LineageSelection = {
        nodeWithColumns: new Map([[startNodesId, startNodeColumns]]),
        edges: new Set(),
    };

    let startFrom = result.nodeWithColumns;
    while (edgesByNodeId.size > 0) {
        const visitedNodeColumns = new Map<string, Set<string>>();
        const visitedEdges = new Set<string>();

        startFrom.forEach((columns, nodeId) => {
            const edges = edgesByNodeId.get(nodeId);
            if (!edges) {
                return;
            }
            edges.forEach((edge: Edge) => {
                const nodeId = edge[edgeNodeAttribute];
                const columnToSearch = edge[directNodeHandle];
                const columnToInclude = edge[reverseNodeHandle];

                const visitedColumns =
                    visitedNodeColumns.get(nodeId) ?? new Set();

                if (
                    columns.size > 0 &&
                    columnToSearch &&
                    columns.has(columnToSearch)
                ) {
                    visitedEdges.add(edge.id);
                    if (columnToInclude) {
                        visitedColumns.add(columnToInclude);
                    }
                    visitedNodeColumns.set(nodeId, visitedColumns);
                } else if (columns.size == 0) {
                    visitedEdges.add(edge.id);
                    visitedNodeColumns.set(nodeId, visitedColumns);
                }
            });
            edgesByNodeId.delete(nodeId);
        });

        if (visitedNodeColumns.size == 0 && visitedEdges.size == 0) {
            break;
        }

        result.nodeWithColumns = mergeMaps(
            result.nodeWithColumns,
            visitedNodeColumns,
        );
        result.edges = mergeSets(result.edges, visitedEdges);
        startFrom = visitedNodeColumns;
    }

    return result;
};

export const mergeSelection = (
    selection1: LineageSelection,
    selection2: LineageSelection,
): LineageSelection => {
    return {
        nodeWithColumns: mergeMaps(
            selection1.nodeWithColumns,
            selection2.nodeWithColumns,
        ),
        edges: mergeSets(selection1.edges, selection2.edges),
    };
};

export const isSubgraphSelected = (selection: LineageSelection) => {
    if (selection.edges.size > 0) {
        return true;
    }

    let someColumnsSelected = false;
    selection.nodeWithColumns.forEach((columns) => {
        if (columns.size > 0) {
            someColumnsSelected = true;
        }
    });
    return someColumnsSelected;
};
