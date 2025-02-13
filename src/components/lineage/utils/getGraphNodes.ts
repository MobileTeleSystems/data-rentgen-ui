import {
    DatasetResponseV1,
    IORelationSchemaV1,
    JobResponseV1,
    LineageResponseV1,
    OperationResponseV1,
    RunResponseV1,
} from "@/dataProvider/types";
import { Node } from "@xyflow/react";

const getDataseNode = (
    node: DatasetResponseV1,
    raw_response: LineageResponseV1,
): Node => {
    const outputSchemas = raw_response.relations.outputs
        .filter((output) => output.to.id == node.id && output.schema !== null)
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

    const inputSchemas = raw_response.relations.inputs
        .filter((input) => input.to.id == node.id && input.schema !== null)
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

    return {
        id: "DATASET-" + node.id,
        type: "datasetNode",
        position: { x: 0, y: 0 },
        data: {
            ...node,
            kind: "DATASET",
            schema: schema,
            schemaFrom: schemaFrom,
            schemaCount: schemaCount,
        },
    };
};

const getJobNode = (node: JobResponseV1): Node => {
    return {
        id: "JOB-" + node.id,
        type: "jobNode",
        position: { x: 0, y: 0 },
        data: {
            ...node,
            kind: "JOB",
        },
    };
};

const getRunNode = (node: RunResponseV1): Node => {
    return {
        id: "RUN-" + node.id,
        type: "runNode",
        position: { x: 0, y: 0 },
        data: {
            ...node,
            kind: "RUN",
        },
    };
};

const getOperationNode = (node: OperationResponseV1): Node => {
    return {
        id: "OPERATION-" + node.id,
        type: "operationNode",
        position: { x: 0, y: 0 },
        data: {
            ...node,
            kind: "OPERATION",
        },
    };
};

const getGraphNodes = (raw_response: LineageResponseV1): Node[] => {
    return [
        ...Object.values(raw_response.nodes.datasets).map((dataset) =>
            getDataseNode(dataset, raw_response),
        ),
        ...Object.values(raw_response.nodes.jobs).map(getJobNode),
        ...Object.values(raw_response.nodes.runs).map(getRunNode),
        ...Object.values(raw_response.nodes.operations).map(getOperationNode),
    ];
};

export default getGraphNodes;
