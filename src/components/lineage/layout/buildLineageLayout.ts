import dagre from "@dagrejs/dagre";
import { Node, Edge } from "@xyflow/react";

const NODE_SEPARATOR = 100;
const LINEAGE_DIRECTION_HORIZONTAL = "LR";

const buildLineageLayout = ({
    nodes,
    edges,
}: {
    nodes: Node[];
    edges: Edge[];
}): { nodes: Node[]; edges: Edge[] } => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    dagreGraph.setGraph({
        rankdir: LINEAGE_DIRECTION_HORIZONTAL,
        nodesep: NODE_SEPARATOR,
    });

    const connectedWithEdges = new Set(
        edges.flatMap((edge) => [edge.source, edge.target]),
    );

    nodes.forEach((node) => {
        if (connectedWithEdges.has(node.id)) {
            dagreGraph.setNode(node.id, {
                width: node.measured?.width ?? node.width ?? node.initialWidth,
                height:
                    node.measured?.height ?? node.height ?? node.initialHeight,
            });
        }
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph, { minlen: 2 });

    const newNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        if (!nodeWithPosition) {
            return node;
        }

        return {
            ...(node as Node),
            // We are shifting the dagre node position (anchor=center center) to the top left
            // so it matches the React Flow node anchor point (top left).
            position: {
                x: nodeWithPosition.x - nodeWithPosition.width / 2,
                y: nodeWithPosition.y - nodeWithPosition.height / 2,
            },
        };
    });

    return { nodes: newNodes, edges };
};

export default buildLineageLayout;
