import { NodeProps, Node } from "@xyflow/react";
import { useCreatePath, useTranslate } from "react-admin";
import { memo, ReactElement } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { DatasetResponseV1 } from "@/dataProvider/types";
import { LocationIconWithType } from "@/components/location";
import { Button, CardHeader, Typography } from "@mui/material";
import BaseNode from "../base_node/BaseNode";
import DatasetSchemaTable from "./DatasetSchemaTable";

export type DatasetNode = Node<DatasetResponseV1, "datasetNode">;

const DatasetNode = (props: NodeProps<DatasetNode>): ReactElement => {
    const translate = useTranslate();

    let title = props.data.name;
    const subheader = `${props.data.location.type}://${props.data.location.name}`;
    if (title.includes("/")) {
        title = ".../" + title.split("/").slice(-2).join("/");
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
            expandableContent={
                props.data && props.data.schema ? (
                    <>
                        <Typography sx={{ textAlign: "center" }}>
                            {translate(
                                `resources.datasets.fields.schema.${props.data.schemaFrom}`,
                                { smart_count: props.data.schemaCount },
                            )}
                        </Typography>
                        <DatasetSchemaTable fields={props.data.schema.fields} />
                    </>
                ) : null
            }
        />
    );
};

export default memo(DatasetNode);
