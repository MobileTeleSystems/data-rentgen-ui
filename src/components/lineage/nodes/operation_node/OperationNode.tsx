import { NodeProps, Node, Handle, Position, useReactFlow } from "@xyflow/react";
import { useCreatePath, useTranslate } from "react-admin";
import { memo, MouseEvent, ReactElement, useContext } from "react";
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
import { formatDate } from "@/utils/datetime";
import { statusToThemeColor } from "@/utils/color";
import LineageSelectionContext from "@/components/lineage/selection/LineageSelectionContext";
import {
    getAllHandleRelations,
    getNearestHandleRelations,
} from "@/components/lineage/selection/utils/handleSelection";
import { DurationField } from "@/components/base";

export type OperationNode = Node<OperationResponseV1, "operationNode">;

const OperationNode = ({
    jobNodeId,
    ...props
}: { jobNodeId: string } & NodeProps<OperationNode>): ReactElement => {
    const createPath = useCreatePath();
    const { getEdges } = useReactFlow();

    const title = props.data.description ?? props.data.name;

    const createdAt = formatDate(new Date(props.data.created_at));
    const duration = <DurationField fieldSet={props.data} />;

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

    const { selection, setSelection } = useContext(LineageSelectionContext);
    const isSelected =
        selection.nodeWithHandles.get(jobNodeId)?.has(handleId) ?? false;

    const onClick = (e: MouseEvent) => {
        const selection = getNearestHandleRelations(
            getEdges(),
            jobNodeId,
            handleId,
        );
        setSelection(selection);
        e.stopPropagation();
    };

    const onDoubleClick = (e: MouseEvent) => {
        const selection = getAllHandleRelations(
            getEdges(),
            jobNodeId,
            handleId,
        );
        setSelection(selection);
        e.stopPropagation();
    };

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
            className={`operationNode ${isSelected ? "selected" : ""}`}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
        />
    );
};

export default memo(OperationNode);
