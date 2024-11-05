import { NodeProps, Node } from "@xyflow/react";
import { useCreatePath } from "react-admin";
import { ReactElement, memo } from "react";
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
import BaseNode from "./BaseNode";
import { OperationIcon } from "@/components/operation";
import { formatDate, getDurationText } from "@/utils/datetime";
import { statusToThemeColor } from "@/utils/color";

export type OperationNode = Node<OperationResponseV1, "operationNode">;

const OperationNode = memo((props: NodeProps<OperationNode>): ReactElement => {
    const title = props.data.description ?? props.data.name;

    const createdAt = formatDate(new Date(props.data.created_at));
    const duration = getDurationText({
        created_at: props.data.created_at,
        started_at: props.data.started_at,
        ended_at: props.data.ended_at,
    });

    const color = statusToThemeColor(props.data.status);

    const createPath = useCreatePath();
    const path = createPath({
        resource: "operations",
        type: "show",
        id: props.data.id,
    });

    return (
        <BaseNode
            nodeId={props.id}
            icon={
                <OperationIcon
                    operation={props.data}
                    sx={{ minWidth: "5em", alignItems: "center" }}
                />
            }
            header={
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
                                    <Divider orientation="vertical" flexItem />
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
            }
        />
    );
});

export default OperationNode;
