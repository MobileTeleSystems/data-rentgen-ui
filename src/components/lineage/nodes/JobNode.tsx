import { NodeProps, Node } from "@xyflow/react";
import { useCreatePath } from "react-admin";
import { ReactElement, memo } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { JobResponseV1 } from "@/dataProvider/types";
import { Button, CardHeader } from "@mui/material";
import BaseNode from "./base_node/BaseNode";
import { JobIconWithType } from "@/components/job";

export type JobNode = Node<JobResponseV1, "jobNode">;

const JobNode = (props: NodeProps<JobNode>): ReactElement => {
    let title = props.data.name;
    let subheader = `${props.data.location.type}://${props.data.location.name}`;
    if (props.data.name.includes("/")) {
        title = props.data.name.substring(props.data.name.lastIndexOf("/") + 1);
        subheader +=
            "/" +
            props.data.name.substring(0, props.data.name.lastIndexOf("/")) +
            "/";
    }

    const createPath = useCreatePath();
    const path = createPath({
        resource: "jobs",
        type: "show",
        id: props.data.id,
    });

    return (
        <BaseNode
            nodeId={props.id}
            icon={
                <JobIconWithType
                    job={props.data}
                    sx={{ minWidth: "10em", alignItems: "center" }}
                />
            }
            header={
                <CardHeader
                    title={title}
                    subheader={subheader}
                    action={
                        <Button size="small" href={"#" + path}>
                            <OpenInNewIcon />
                        </Button>
                    }
                />
            }
        />
    );
};

export default memo(JobNode);
