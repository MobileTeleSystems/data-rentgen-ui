import { Edge, Node, useReactFlow } from "@xyflow/react";
import { useCallback, MouseEvent } from "react";

const useLineageSelection = () => {
    const { getNodes, getEdges, setEdges, setNodes } = useReactFlow();

    const setSelection = (
        nodesToSelect: Set<string>,
        edgesToSelect: Set<string>,
    ) => {
        const nodes = getNodes().map((node) => {
            node.selected = nodesToSelect.has(node.id);
            return node;
        });

        const edges = getEdges().map((edge) => {
            edge.selected = edgesToSelect.has(edge.id);
            return edge;
        });

        setNodes(nodes);
        setEdges(edges);
    };

    const _visitNodes = (
        startNodeIds: string[],
        edgesByNodeId: Map<string, Edge[]>,
        edgeAttribute: "source" | "target",
    ): { nodes: Set<string>; edges: Set<string> } => {
        const result = {
            nodes: new Set<string>(),
            edges: new Set<string>(),
        };

        let startFrom = new Set<string>(startNodeIds);
        while (edgesByNodeId.size > 0) {
            const visitedNodes = new Set<string>();
            const visitedEdges = new Set<string>();

            startFrom.forEach((nodeId) => {
                const edges = edgesByNodeId.get(nodeId);
                if (edges) {
                    edges.forEach((edge: Edge) => {
                        visitedNodes.add(edge[edgeAttribute]);
                        visitedEdges.add(edge.id);
                    });
                    edgesByNodeId.delete(nodeId);
                }
            });
            if (visitedNodes.size == 0 && visitedEdges.size == 0) {
                break;
            }

            visitedNodes.forEach((nodeId) => {
                result.nodes.add(nodeId);
            });
            visitedEdges.forEach((edgeId) => {
                result.edges.add(edgeId);
            });
            startFrom = visitedNodes;
        }

        return result;
    };

    const getAllRelations = (
        nodeIds: string[],
    ): { nodes: Set<string>; edges: Set<string> } => {
        const result = {
            nodes: new Set<string>(nodeIds),
            edges: new Set<string>(),
        };

        const rawEdges = getEdges();

        // Convert list to maps to use O(1) lookups
        const edgesBySource = new Map<string, Edge[]>();
        const edgesByTarget = new Map<string, Edge[]>();
        rawEdges.forEach((edge) => {
            const sameSource = edgesBySource.get(edge.source) ?? [];
            sameSource.push(edge);
            edgesBySource.set(edge.source, sameSource);

            const sameTarget = edgesByTarget.get(edge.target) ?? [];
            sameTarget.push(edge);
            edgesByTarget.set(edge.target, sameTarget);
        });

        const upstreams = _visitNodes(nodeIds, edgesByTarget, "source");
        const downstreams = _visitNodes(nodeIds, edgesBySource, "target");

        upstreams.nodes.forEach((nodeId) => result.nodes.add(nodeId));
        upstreams.edges.forEach((edgeId) => result.edges.add(edgeId));
        downstreams.nodes.forEach((nodeId) => result.nodes.add(nodeId));
        downstreams.edges.forEach((edgeId) => result.edges.add(edgeId));

        return result;
    };

    const selectNode = useCallback((nodeId: string) => {
        setSelection(new Set([nodeId]), new Set());
    }, []);

    const onEdgeClick = useCallback((e: MouseEvent, currentEdge: Edge) => {
        setSelection(
            new Set([currentEdge.source, currentEdge.target]),
            new Set([currentEdge.id]),
        );
        e.stopPropagation();
    }, []);

    const onEdgeDoubleClick = useCallback(
        (e: MouseEvent, currentEdge: Edge) => {
            const { nodes, edges } = getAllRelations([
                currentEdge.source,
                currentEdge.target,
            ]);
            setSelection(nodes, edges);
            e.stopPropagation();
        },
        [],
    );

    const onNodeClick = useCallback((e: MouseEvent, currentNode: Node) => {
        selectNode(currentNode.id);
        e.stopPropagation();
    }, []);

    const onNodeDoubleClick = useCallback(
        (e: MouseEvent, currentNode: Node) => {
            const { nodes, edges } = getAllRelations([currentNode.id]);
            setSelection(nodes, edges);
            e.stopPropagation();
        },
        [],
    );

    const onPaneClick = useCallback((e: MouseEvent) => {
        setSelection(new Set(), new Set());
        e.stopPropagation();
    }, []);

    return {
        onEdgeClick,
        onEdgeDoubleClick,
        onNodeClick,
        onNodeDoubleClick,
        onPaneClick,
    };
};

export default useLineageSelection;
