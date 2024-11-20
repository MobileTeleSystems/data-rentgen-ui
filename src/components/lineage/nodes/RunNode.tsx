import { NodeProps, Node } from "@xyflow/react";
import { useCreatePath } from "react-admin";
import { ReactElement, memo } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { RunResponseV1 } from "@/dataProvider/types";
import {
    Button,
    CardHeader,
    Chip,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import BaseNode from "./base_node/BaseNode";
import { RunIcon } from "@/components/run";
import { formatDate, getDurationText } from "@/utils/datetime";
import { statusToThemeColor } from "@/utils/color";

export type RunNode = Node<RunResponseV1, "runNode">;

const RunNode = memo((props: NodeProps<RunNode>): ReactElement => {
    const createdAt = formatDate(new Date(props.data.created_at));

    const title = props.data.external_id ? props.data.external_id : createdAt;
    const subheader = props.data.external_id ? createdAt : "";
    const color = statusToThemeColor(props.data.status);

    const duration = getDurationText({
        created_at: props.data.created_at,
        started_at: props.data.started_at,
        ended_at: props.data.ended_at,
    });

    const createPath = useCreatePath();
    const path = createPath({
        resource: "runs",
        type: "show",
        id: props.data.id,
    });

    return (
        <BaseNode
            nodeId={props.id}
            icon={
                <RunIcon
                    run={props.data}
                    sx={{ minWidth: "5em", alignItems: "center" }}
                />
            }
            header={
                <CardHeader
                    title={title}
                    subheader={
                        <Stack direction="row" spacing={1}>
                            <Typography variant="subtitle1">
                                {subheader}
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

export default RunNode;
