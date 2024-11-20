import { NodeProps, Node, useReactFlow, Edge } from "@xyflow/react";
import { useCreatePath, useTranslate } from "react-admin";
import { ReactElement, memo } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import {
    DatasetResponseV1,
    InputRelationLineageResponseV1,
    IORelationSchemaFieldV1,
    IORelationSchemaV1,
    OutputRelationLineageResponseV1,
} from "@/dataProvider/types";
import { LocationIconWithType } from "@/components/location";
import { Button, CardHeader, Typography } from "@mui/material";
import BaseNode from "../base_node/BaseNode";
import DatasetSchemaTable from "./DatasetSchemaTable";

export type DatasetNode = Node<DatasetResponseV1, "datasetNode">;

const DatasetNode = memo((props: NodeProps<DatasetNode>): ReactElement => {
    const translate = useTranslate();
    const reactFlow = useReactFlow();

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

    const schemasById = new Map<number, IORelationSchemaV1>();
    reactFlow
        .getEdges()
        .filter(
            (edge) =>
                (edge.data?.kind == "INPUT" && edge.source === props.id) ||
                (edge.data?.kind == "OUTPUT" && edge.target === props.id),
        )
        .forEach((edge) => {
            if (edge.data?.schema) {
                const schema = edge.data.schema as IORelationSchemaV1;
                schemasById.set(schema.id, schema);
            }
        });

    // if there are multiple schemas, we don't know which one to show, so just show no schema.
    const schema: IORelationSchemaV1 | undefined =
        schemasById.size == 1 ? schemasById.values().next().value : undefined;

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
                schema ? (
                    <>
                        <Typography sx={{ textAlign: "center" }}>
                            {translate("resources.datasets.fields.schema.name")}
                        </Typography>
                        <DatasetSchemaTable fields={schema.fields} />
                    </>
                ) : null
            }
        />
    );
});

export default DatasetNode;
