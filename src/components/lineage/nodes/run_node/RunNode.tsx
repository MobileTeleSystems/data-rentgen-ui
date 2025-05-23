import { NodeProps, Node, Handle, Position, useReactFlow } from "@xyflow/react";
import { useCreatePath, useTranslate } from "react-admin";
import { memo, MouseEvent, ReactElement, useContext } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { RunResponseV1 } from "@/dataProvider/types";
import { Button, CardHeader, Divider, Stack, Typography } from "@mui/material";
import BaseNode from "../base_node/BaseNode";
import { RunIcon } from "@/components/run";
import { formatDate } from "@/utils/datetime";
import OperationNodeList from "../operation_node/OperationNodeList";
import {
    getAllHandleRelations,
    getNearestHandleRelations,
} from "@/components/lineage/selection/utils/handleSelection";
import LineageSelectionContext from "@/components/lineage/selection/LineageSelectionContext";
import { DurationField, StatusField } from "@/components/base";

export type RunNode = Node<RunResponseV1, "runNode">;

const RunNode = ({
    jobNodeId,
    ...props
}: { jobNodeId: string } & NodeProps<RunNode>): ReactElement => {
    const translate = useTranslate();
    const { getEdges } = useReactFlow();
    const createPath = useCreatePath();

    const createdAt = formatDate(new Date(props.data.created_at));

    const title = props.data.external_id ? props.data.external_id : createdAt;
    const subheader = props.data.external_id ? createdAt : "";

    const duration = <DurationField fieldSet={props.data} />;

    const path = createPath({
        resource: "runs",
        type: "show",
        id: props.data.id,
    });

    const handleId = `RUN-${props.data.id}`;
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
            icon={<RunIcon sx={{ minWidth: "5em", alignItems: "center" }} />}
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
                                    {subheader}
                                </Typography>
                                <Divider orientation="vertical" flexItem />
                                <StatusField
                                    status={props.data.status}
                                    size="small"
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
            defaultExpanded
            expandableContent={
                props.data.operations.length > 0 ? (
                    <>
                        <Typography sx={{ textAlign: "center" }}>
                            {translate("resources.operations.name", {
                                smart_count: 2,
                            })}
                        </Typography>
                        <OperationNodeList
                            jobNodeId={jobNodeId}
                            operations={props.data.operations}
                        />
                    </>
                ) : null
            }
            className={`runNode ${isSelected ? "selected" : ""}`}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
        />
    );
};

export default memo(RunNode);
