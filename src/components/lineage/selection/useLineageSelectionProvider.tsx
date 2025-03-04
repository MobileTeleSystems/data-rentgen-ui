import { useReactFlow } from "@xyflow/react";
import { useCallback, useState } from "react";
import { LineageSelection } from "./utils/common";

const useLineageSelectionProvider = () => {
    const { getNodes, setNodes, getEdges, setEdges } = useReactFlow();

    const [selection, setSelectionState] = useState<LineageSelection>({
        nodeWithColumns: new Map<string, Set<string>>(),
        edges: new Set<string>(),
    });

    const setSelection = useCallback((newValue: LineageSelection) => {
        setSelectionState(newValue);
        const newNodes = getNodes().map((node) => {
            return {
                ...node,
                selected: newValue.nodeWithColumns.has(node.id),
            };
        });
        const newEdges = getEdges().map((edge) => {
            return {
                ...edge,
                selected: newValue.edges.has(edge.id),
            };
        });
        setNodes(newNodes);
        setEdges(newEdges);
    }, []);

    const resetSelection = useCallback(() => {
        setSelectionState({
            nodeWithColumns: new Map<string, Set<string>>(),
            edges: new Set<string>(),
        });
    }, []);

    return {
        selection,
        setSelection,
        resetSelection,
    };
};

export default useLineageSelectionProvider;
