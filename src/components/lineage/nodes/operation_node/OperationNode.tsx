import { NodeProps, Node, Handle, Position, useReactFlow } from "@xyflow/react";
import { useCreatePath } from "react-admin";
import { memo, ReactElement } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { OperationResponseV1 } from "@/dataProvider/types";
import {
    Button,
    CardHeader,
    Chip,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import BaseNode from "../base_node/BaseNode";
import { OperationIcon } from "@/components/operation";
import { formatDate, getDurationText } from "@/utils/datetime";
import { statusToThemeColor } from "@/utils/color";

export type OperationNode = Node<OperationResponseV1, "operationNode">;

const OperationNode = (props: NodeProps<OperationNode>): ReactElement => {
    const createPath = useCreatePath();
    const { getEdges } = useReactFlow();

    const title = props.data.description ?? props.data.name;

    const createdAt = formatDate(new Date(props.data.created_at));
    const duration = getDurationText({
        created_at: props.data.created_at,
        started_at: props.data.started_at,
        ended_at: props.data.ended_at,
    });

    const color = statusToThemeColor(props.data.status);

    const path = createPath({
        resource: "operations",
        type: "show",
        id: props.data.id,
    });

    const handleId = `OPERATION-${props.data.id}`;
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
                <OperationIcon sx={{ minWidth: "5em", alignItems: "center" }} />
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
                        title={title}
                        subheader={
                            <Stack direction="row" spacing={1}>
                                <Typography variant="subtitle1">
                                    {createdAt}
                                </Typography>
                                <Divider orientation="vertical" flexItem />
                                <Chip
                                    color={color}
                                    size="small"
                                    label={props.data.status}
                                />
                                {duration && (
                                    <>
                                        <Divider
                                            orientation="vertical"
                                            flexItem
                                        />
                                        <Typography variant="subtitle1">
                                            {duration}
                                        </Typography>
                                    </>
                                )}
                            </Stack>
                        }
                        action={
                            <Button size="small" href={"#" + path}>
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

export default memo(OperationNode);
