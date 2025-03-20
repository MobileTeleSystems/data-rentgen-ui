import { NodeProps, Node } from "@xyflow/react";
import { useCreatePath, useTranslate } from "react-admin";
import { memo, ReactElement } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { JobResponseV1 } from "@/dataProvider/types";
import { Button, CardHeader, Typography } from "@mui/material";
import BaseNode from "../base_node/BaseNode";
import { JobIconWithType } from "@/components/job";
import RunNodeList from "../run_node/RunNodeList";

import "./JobNode.css";

export type JobNode = Node<JobResponseV1, "jobNode">;

const JobNode = (props: NodeProps<JobNode>): ReactElement => {
    const translate = useTranslate();

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
                    title={props.data.title}
                    subheader={props.data.subheader}
                    action={
                        <Button size="small" href={"#" + path}>
                            <OpenInNewIcon />
                        </Button>
                    }
                    sx={{ justifyContent: "flex-end" }}
                />
            }
            defaultExpanded
            expandableContent={
                props.data.runs.length > 0 ? (
                    <>
                        <Typography sx={{ textAlign: "center" }}>
                            {translate(`resources.runs.name`, {
                                smart_count: props.data.runs,
                            })}
                        </Typography>
                        <RunNodeList
                            jobNodeId={props.id}
                            runs={props.data.runs}
                        />
                    </>
                ) : null
            }
        />
    );
};

export default memo(JobNode);
