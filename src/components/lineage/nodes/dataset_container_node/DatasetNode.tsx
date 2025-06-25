import { NodeProps, Node, Handle, useReactFlow, Position } from "@xyflow/react";
import { useCreatePath } from "react-admin";
import { memo, ReactElement } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { DatasetResponseV1 } from "@/dataProvider/types";
import { LocationIconWithType } from "@/components/location";
import { Button, CardHeader } from "@mui/material";
import BaseNode from "../base_node/BaseNode";

export type DatasetNode = Node<DatasetResponseV1, "datasetNode">;
export type DatasetNodeProps = NodeProps<DatasetNode>;

const DatasetNode = ({
    containerNodeId,
    ...props
}: { containerNodeId: string } & DatasetNodeProps): ReactElement => {
    const createPath = useCreatePath();
    const { getEdges } = useReactFlow();

    const path = createPath({
        resource: "datasets",
        type: "show",
        id: props.data.id,
    });

    const handleId = `DATASET-${props.data.id}`;
    const hasIncoming = getEdges().some(
        (edge) => edge.targetHandle === handleId,
    );
    const hasOutgoing = getEdges().some(
        (edge) => edge.sourceHandle === handleId,
    );

    return (
        <BaseNode
            nodeId={props.id}
            icon={
                <LocationIconWithType
                    location={props.data.location}
                    sx={{ minWidth: "5em", alignItems: "center" }}
                />
            }
            header={
                <>
                    {hasIncoming && (
                        <Handle
                            type="target"
                            id={handleId}
                            position={Position.Left}
                            isConnectable={false}
                        />
                    )}
                    <CardHeader
                        title={props.data.title}
                        subheader={props.data.subheader}
                        action={
                            <Button size="small" href={path}>
                                <OpenInNewIcon />
                            </Button>
                        }
                    />
                    {hasOutgoing && (
                        <Handle
                            type="source"
                            id={handleId}
                            position={Position.Right}
                            isConnectable={false}
                        />
                    )}
                </>
            }
        />
    );
};

export default memo(DatasetNode);
