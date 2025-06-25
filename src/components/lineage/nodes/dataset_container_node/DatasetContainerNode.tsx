import { NodeProps, Node } from "@xyflow/react";
import { useTranslate } from "react-admin";
import { memo, ReactElement } from "react";

import "./DatasetContainerNode.css";
import { IORelationSchemaV1 } from "@/dataProvider/types";
import { Stack, Typography } from "@mui/material";
import BaseNode from "../base_node/BaseNode";
import DatasetSchemaTable from "./DatasetSchemaTable";
import DatasetNode, { DatasetNodeProps } from "./DatasetNode";

export type DatasetContainerData = {
    datasets: DatasetNodeProps[];
    expanded: boolean;
    schema: IORelationSchemaV1 | null;
};

export type DatasetContainerNode = Node<
    DatasetContainerData,
    "datasetContainerNode"
>;

const DatasetContainerNode = (
    props: NodeProps<DatasetContainerNode>,
): ReactElement => {
    const translate = useTranslate();

    return (
        <BaseNode
            nodeId={props.id}
            header={
                <Stack
                    direction="column"
                    justifyContent={"flex-end"}
                    className="nodrag nopan"
                >
                    {props.data.datasets.map((dataset) => (
                        <DatasetNode
                            containerNodeId={props.id}
                            key={dataset.id}
                            {...dataset}
                        />
                    ))}
                </Stack>
            }
            defaultExpanded={props.data.expanded}
            expandableContent={
                props.data.schema ? (
                    <>
                        <Typography sx={{ textAlign: "center" }}>
                            {translate(
                                `resources.datasets.fields.schema.${props.data.schema.relevance_type.toLowerCase()}`,
                            )}
                        </Typography>
                        <DatasetSchemaTable
                            nodeId={props.id}
                            fields={props.data.schema.fields}
                        />
                    </>
                ) : null
            }
        />
    );
};

export default memo(DatasetContainerNode);
