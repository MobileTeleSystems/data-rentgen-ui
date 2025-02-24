import {
    DatasetResponseV1,
    IORelationSchemaV1,
    JobResponseV1,
    LineageResponseV1,
    RunResponseV1,
} from "@/dataProvider/types";
import { Node, Position } from "@xyflow/react";

const BASE_NODE_HEIGHT = 120;
const BASE_NODE_WIDTH = 800;
const BASE_NODE_WIDTH_PER_CHAR = 25;

const getDefaultNode = () => {
    return {
        position: { x: 0, y: 0 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        initialWidth: BASE_NODE_WIDTH,
        initialHeight: BASE_NODE_HEIGHT,
    };
};

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
        ...getDefaultNode(),
        id: "DATASET-" + node.id,
        type: "datasetNode",
        data: {
            ...node,
            kind: "DATASET",
            schema: schema,
            schemaFrom: schemaFrom,
            schemaCount: schemaCount,
        },
    };
};

const getJobNode = (
    node: JobResponseV1,
    raw_response: LineageResponseV1,
): Node => {
    const runsById: Map<string, RunResponseV1> = new Map();

    let maxNameWidth = node.name.length;

    Object.values(raw_response.nodes.runs)
        .filter((other_node) => other_node.job_id == node.id)
        .forEach((run) => {
            run.operations = [];
            runsById.set(run.id, run);
            maxNameWidth = Math.max(maxNameWidth, run.external_id?.length ?? 1);
        });

    Object.values(raw_response.nodes.operations)
        .filter((other_node) => runsById.has(other_node.run_id))
        .forEach((operation) => {
            const run = runsById.get(operation.run_id)!;
            run.operations.push(operation);
            runsById.set(operation.run_id, run);
            maxNameWidth = Math.max(
                maxNameWidth,
                operation.name.length,
                operation.description?.length ?? 1,
            );
        });

    const runs = runsById
        .values()
        .toArray()
        .toSorted((a, b) => (a.created_at < b.created_at ? 1 : -1));

    return {
        ...getDefaultNode(),
        id: "JOB-" + node.id,
        type: "jobNode",
        initialWidth: maxNameWidth * BASE_NODE_WIDTH_PER_CHAR,
        initialHeight: Math.min(runs.length + 1, 10) * BASE_NODE_HEIGHT,
        data: {
            ...node,
            kind: "JOB",
            runs: runs,
        },
    };
};

const getGraphNodes = (raw_response: LineageResponseV1): Node[] => {
    return [
        ...Object.values(raw_response.nodes.datasets).map((dataset) =>
            getDataseNode(dataset, raw_response),
        ),
        ...Object.values(raw_response.nodes.jobs).map((job) =>
            getJobNode(job, raw_response),
        ),
    ];
};

export default getGraphNodes;
