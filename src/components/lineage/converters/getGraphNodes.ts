import {
    DatasetResponseV1,
    IORelationSchemaV1,
    JobResponseV1,
    LineageResponseV1,
    RunResponseV1,
} from "@/dataProvider/types";
import { Node } from "@xyflow/react";

const BASE_NODE_HEIGHT = 120;
const BASE_NODE_WIDTH = 800;
const BASE_NODE_WIDTH_PER_CHAR = 25;

const getDefaultNode = () => {
    return {
        position: { x: 0, y: 0 },
        initialWidth: BASE_NODE_WIDTH,
        initialHeight: BASE_NODE_HEIGHT,
    };
};

const getDataseNode = (
    node: DatasetResponseV1,
    raw_response: LineageResponseV1,
): Node => {
    let title = node.name;
    const subheader = `${node.location.type}://${node.location.name}`;
    if (title.includes("/")) {
        // For path like "/app/warehouse/hive/external/some.db/table"
        // show only "../some.db/table"
        title = ".../" + title.split("/").slice(-2).join("/");
    }

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
    let schemaFrom: string = "output";
    if (outputSchemas.length > 0) {
        schema = outputSchemas[0];
        schemaFrom = "output";
        if (outputSchemas.length > 1) {
            schema.relevance_type = "LATEST_KNOWN";
        }
    } else if (inputSchemas.length > 0) {
        schema = inputSchemas[0];
        schemaFrom = "input";
        if (inputSchemas.length > 1) {
            schema.relevance_type = "LATEST_KNOWN";
        }
    }

    let hasColumnLineage = false;
    if (raw_response.relations.direct_column_lineage?.length) {
        hasColumnLineage = raw_response.relations.direct_column_lineage.some(
            (relation) =>
                relation.from.id == node.id || relation.to.id == node.id,
        );
    } else if (raw_response.relations.indirect_column_lineage?.length) {
        hasColumnLineage = raw_response.relations.indirect_column_lineage.some(
            (relation) =>
                relation.from.id == node.id || relation.to.id == node.id,
        );
    }

    const maxNameWidth = Math.max(title.length, subheader.length);
    const maxWidth = Math.max(
        maxNameWidth * BASE_NODE_WIDTH_PER_CHAR,
        BASE_NODE_WIDTH,
    );

    let maxHeight = BASE_NODE_HEIGHT;
    if (schema && hasColumnLineage) {
        maxHeight += BASE_NODE_HEIGHT * Math.min(schema.fields.length, 10);
    }

    return {
        ...getDefaultNode(),
        id: "DATASET-" + node.id,
        type: "datasetNode",
        initialHeight: maxHeight,
        initialWidth: maxWidth,
        data: {
            ...node,
            kind: "DATASET",
            title: title,
            subheader: subheader,
            expanded: hasColumnLineage,
            schema: schema,
            schemaFrom: schemaFrom,
        },
    };
};

const getJobNode = (
    node: JobResponseV1,
    raw_response: LineageResponseV1,
): Node => {
    const runsById: Map<string, RunResponseV1> = new Map();

    let title = node.name;
    let subheader = `${node.location.type}://${node.location.name}`;
    if (node.name.includes("/")) {
        // For long job names like "/group/subgroup/job_name"
        // move "/group/subgroup/" to subheader
        title = node.name.substring(node.name.lastIndexOf("/") + 1);
        subheader += "/" + node.name.substring(0, node.name.lastIndexOf("/"));
    }

    let maxNameWidth = Math.max(title.length, subheader.length);

    Object.values(raw_response.nodes.runs)
        .filter((other_node) => other_node.job_id == node.id)
        // show most recent operations on top
        .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
        .forEach((run) => {
            run.operations = [];
            runsById.set(run.id, run);
            maxNameWidth = Math.max(maxNameWidth, run.external_id?.length ?? 1);
        });

    Object.values(raw_response.nodes.operations)
        .filter((other_node) => runsById.has(other_node.run_id))
        // show most recent operations on top
        .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
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

    // Map.values().toArray() availability is limited
    const runs: RunResponseV1[] = [];
    runsById.forEach((value) => {
        runs.push(value);
    });

    const maxWidth = Math.max(
        maxNameWidth * BASE_NODE_WIDTH_PER_CHAR,
        BASE_NODE_WIDTH,
    );
    const maxHeight = Math.min(runs.length + 1, 10) * BASE_NODE_HEIGHT;

    return {
        ...getDefaultNode(),
        id: "JOB-" + node.id,
        type: "jobNode",
        initialWidth: maxWidth,
        initialHeight: maxHeight,
        data: {
            ...node,
            kind: "JOB",
            title: title,
            subheader: subheader,
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
