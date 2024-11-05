import { NodeProps, Node } from "@xyflow/react";
import { useCreatePath } from "react-admin";
import { ReactElement, memo } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { DatasetResponseV1 } from "@/dataProvider/types";
import { LocationIconWithType } from "@/components/location";
import { Button, CardHeader } from "@mui/material";
import BaseNode from "./BaseNode";

export type DatasetNode = Node<DatasetResponseV1, "datasetNode">;

const DatasetNode = memo((props: NodeProps<DatasetNode>): ReactElement => {
    let title = props.data.name;
    let subheader = `${props.data.location.type}://${props.data.location.name}`;
    if (title.includes("/")) {
        title = ".../" + title.substring(title.lastIndexOf("/") + 1);
    }

    const createPath = useCreatePath();
    const path = createPath({
        resource: "datasets",
        type: "show",
        id: props.data.id,
    });

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
});

export default DatasetNode;
