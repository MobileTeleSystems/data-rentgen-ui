import { useDataProvider, useNotify } from "react-admin";

import buildLineageLayout from "./utils/buildLayout";
import { Edge, Node, useNodesState, useEdgesState } from "@xyflow/react";
import LineageFilters from "./LineageFilters";
import LineageGraph from "./LineageGraph";

import "@xyflow/react/dist/style.css";
import getGraphNodes from "./utils/getGraphNodes";
import getGraphEdges from "./utils/getGraphEdges";
import { LineageResponseV1 } from "@/dataProvider/types";

type LineageViewProps = {
    resource: string;
    recordId: string | number;
    defaultSince?: Date;
    defaultDirection?: string;
    granularities?: string[];
};

const LineageView = (props: LineageViewProps) => {
    const dataProvider = useDataProvider();
    const notify = useNotify();

    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

    const onSubmit = (values: {
        since?: string;
        until?: string;
        depth?: number;
        direction?: string;
        granularity?: string;
    }) => {
        setNodes([]);
        setNodes([]);

        if (Object.keys(values).length > 0) {
            dataProvider
                .getLineage(props.resource, {
                    id: props.recordId,
                    filter: values,
                })
                .then((data: LineageResponseV1) => {
                    const initialNodes = getGraphNodes(data);
                    const initialEdges = getGraphEdges(data);
                    const { nodes: layoutedNodes, edges: layoutedEdges } =
                        buildLineageLayout({
                            nodes: initialNodes,
                            edges: initialEdges,
                        });
                    setNodes(layoutedNodes);
                    setEdges(layoutedEdges);
                })
                .catch((error: Error) =>
                    notify(error.message, { type: "error" }),
                );
        }
    };

    return (
        <>
            <LineageFilters onSubmit={onSubmit} {...props} />
            {nodes && edges && (
                <div style={{ height: "80vh" }}>
                    <LineageGraph
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                    ></LineageGraph>
                </div>
            )}
        </>
    );
};

export default LineageView;
