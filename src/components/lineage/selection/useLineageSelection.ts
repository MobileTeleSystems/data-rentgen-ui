import { Edge, Node, useReactFlow } from "@xyflow/react";
import { useCallback, useState, MouseEvent } from "react";

const useLineageSelection = () => {
    const { getNodes, getEdges, setEdges, setNodes } = useReactFlow();
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

    const trackUpstreams = (
        nodeId: string,
    ): { nodes: Set<string>; edges: Set<string> } => {
        const result = {
            nodes: new Set<string>([nodeId]),
            edges: new Set<string>(),
        };

        getEdges()
            .filter((edge) => edge.target == nodeId)
            .forEach((edge) => {
                result.nodes.add(edge.source);
                result.edges.add(edge.id);

                const { nodes, edges } = trackUpstreams(edge.source);
                nodes.forEach((node) => result.nodes.add(node));
                edges.forEach((edge) => result.edges.add(edge));
            });

        return result;
    };

    const trackDownstreams = (
        nodeId: string,
    ): { nodes: Set<string>; edges: Set<string> } => {
        const result = {
            nodes: new Set<string>([nodeId]),
            edges: new Set<string>(),
        };

        getEdges()
            .filter((edge) => edge.source == nodeId)
            .forEach((edge) => {
                result.nodes.add(edge.target);
                result.edges.add(edge.id);

                const { nodes, edges } = trackDownstreams(edge.target);
                nodes.forEach((node) => result.nodes.add(node));
                edges.forEach((edge) => result.edges.add(edge));
            });

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
            const upstreams = trackUpstreams(currentEdge.source);
            const downstreams = trackDownstreams(currentEdge.target);

            const relatedNodes = upstreams.nodes.union(downstreams.nodes);
            const relatedEdges = upstreams.edges.union(downstreams.edges);
            relatedEdges.add(currentEdge.id);

            setSelection(relatedNodes, relatedEdges);
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
            const upstreams = trackUpstreams(currentNode.id);
            const downstreams = trackDownstreams(currentNode.id);

            const relatedNodes = upstreams.nodes.union(downstreams.nodes);
            const relatedEdges = upstreams.edges.union(downstreams.edges);
            relatedNodes.add(currentNode.id);

            setSelection(relatedNodes, relatedEdges);
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
