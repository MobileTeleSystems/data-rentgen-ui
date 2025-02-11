import { NodeProps, Node, useReactFlow } from "@xyflow/react";
import { useCreatePath, useTranslate } from "react-admin";
import { ReactElement, memo } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import {
    DatasetResponseV1,
    InputRelationLineageResponseV1,
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

    const outputSchemas = reactFlow
        .getEdges()
        .filter(
            (edge) => edge.data?.kind == "OUTPUT" && edge.target === props.id,
        )
        // @ts-ignore
        .map((edge) => edge.data as OutputRelationLineageResponseV1)
        // sort by last_interaction_at descending
        .toSorted((a, b) =>
            a.last_interaction_at < b.last_interaction_at ? 1 : -1,
        )
        .map((output) => output.schema)
        .filter((schema) => schema !== null)
        // keep unique schemas only
        .filter(
            (schema, index, array) =>
                array.findIndex((item) => item.id == schema.id) == index,
        );

    const inputSchemas = reactFlow
        .getEdges()
        .filter(
            (edge) => edge.data?.kind == "INPUT" && edge.source === props.id,
        )
        // @ts-ignore
        .map((edge) => edge.data as InputRelationLineageResponseV1)
        // sort by last_interaction_at descending
        .toSorted((a, b) =>
            a.last_interaction_at < b.last_interaction_at ? 1 : -1,
        )
        .map((input) => input.schema)
        .filter((schema) => schema !== null)
        // keep unique schemas only
        .filter(
            (schema, index, array) =>
                array.findIndex((item) => item.id == schema.id) == index,
        );

    // prefer output schema as there is high chance that it describes all the columns properly.
    // read interactions may select only a subset of columns.
    let schema: IORelationSchemaV1 | undefined = undefined;
    let schemaFrom: string = "input";
    let schemaCount = 0;
    if (outputSchemas.length > 0) {
        schema = outputSchemas.at(0);
        schemaFrom = "output";
        schemaCount = outputSchemas.length;
    } else if (inputSchemas.length > 0) {
        schema = inputSchemas.at(0);
        schemaFrom = "input";
        schemaCount = inputSchemas.length;
    }

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
                            {translate(
                                `resources.datasets.fields.schema.${schemaFrom}`,
                                { smart_count: schemaCount },
                            )}
                        </Typography>
                        <DatasetSchemaTable fields={schema.fields} />
                    </>
                ) : null
            }
        />
    );
});

export default DatasetNode;
