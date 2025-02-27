import { Edge, Node, useReactFlow } from "@xyflow/react";
import { useCallback, useState, MouseEvent } from "react";

const useLineageSelection = () => {
    const { getNodes, getEdges, setEdges, setNodes, getNodeConnections } =
        useReactFlow();
    const [hideNonSelected, setHideNonSelected] = useState(false);

    const setSelection = (
        nodesToSelect: Set<string>,
        edgesToSelect: Set<string>,
        hideOthers: boolean = true,
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
        setHideNonSelected(
            hideOthers && nodesToSelect.size + edgesToSelect.size > 0,
        );
    };

    const getAllRelations = (
        nodeIds: string[],
    ): { nodes: Set<string>; edges: Set<string> } => {
        const intermediate = {
            upstreamNodes: new Set<string>(nodeIds),
            downstreamNodes: new Set<string>(nodeIds),
            upstreamEdges: new Set<string>(),
            downstreamEdges: new Set<string>(),
        };

        const rawEdges = getEdges();

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

        while (edgesByTarget.size > 0) {
            let reachedAnything = false;
            intermediate.upstreamNodes.forEach((nodeId) => {
                const upstreamEdges = edgesByTarget.get(nodeId);
                if (upstreamEdges) {
                    upstreamEdges.forEach((edge: Edge) => {
                        intermediate.upstreamNodes.add(edge.source);
                        intermediate.upstreamEdges.add(edge.id);
                    });
                    edgesByTarget.delete(nodeId);
                    reachedAnything = true;
                }
            });
            if (!reachedAnything) {
                break;
            }
        }

        while (edgesBySource.size > 0) {
            let reachedAnything = false;
            intermediate.downstreamNodes.forEach((nodeId) => {
                const downstreamEdges = edgesBySource.get(nodeId);
                if (downstreamEdges) {
                    downstreamEdges.forEach((edge: Edge) => {
                        intermediate.downstreamNodes.add(edge.target);
                        intermediate.downstreamEdges.add(edge.id);
                    });
                    edgesBySource.delete(nodeId);
                    reachedAnything = true;
                }
            });
            if (!reachedAnything) {
                break;
            }
        }

        const result = {
            nodes: new Set<string>(),
            edges: new Set<string>(),
        };

        // Set union is only in ES2024
        intermediate.upstreamNodes.forEach((nodeId) =>
            result.nodes.add(nodeId),
        );
        intermediate.upstreamEdges.forEach((edgeId) =>
            result.edges.add(edgeId),
        );
        intermediate.downstreamNodes.forEach((nodeId) =>
            result.nodes.add(nodeId),
        );
        intermediate.downstreamEdges.forEach((edgeId) =>
            result.edges.add(edgeId),
        );

        return result;
    };

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
        // If only one node is selected, don't hide others, as it not very convenient
        setSelection(new Set([currentNode.id]), new Set(), false);
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
        hideNonSelected,
        onEdgeClick,
        onEdgeDoubleClick,
        onNodeClick,
        onNodeDoubleClick,
        onPaneClick,
    };
};

export default useLineageSelection;
