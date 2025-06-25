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

/*
 * Connect any dataset with symlink to others,
 * Producing map of datasetId -> [symlinkedDatasetIds].
 * For datasets with no symlinks, return datasetId -> [datasetId] mapping.
 */
export const getDatasetIdToRelatedDatasetIdsMapping = (
    rawResponse: LineageResponseV1,
): Map<string, string[]> => {
    const symlinkedDatasets: Map<string, Set<string>> = new Map();

    for (const symlink of Object.values(rawResponse.relations.symlinks)) {
        if (symlink.type == "WAREHOUSE") continue;

        if (!symlinkedDatasets.has(symlink.from.id)) {
            symlinkedDatasets.set(symlink.from.id, new Set<string>());
        }

        const symlinksByFrom = symlinkedDatasets.get(symlink.from.id)!;
        if (!symlinkedDatasets.has(symlink.to.id)) {
            symlinkedDatasets.set(symlink.to.id, symlinksByFrom);
        }
        const symlinksByTo = symlinkedDatasets.get(symlink.to.id)!;

        symlinksByFrom.add(symlink.from.id);
        symlinksByFrom.add(symlink.to.id);

        symlinksByTo.add(symlink.from.id);
        symlinksByTo.add(symlink.to.id);
    }

    const result: Map<string, string[]> = new Map();
    symlinkedDatasets.forEach((otherDatasetIds, datasetId) => {
        result.set(datasetId, Array.from(otherDatasetIds).sort());
    });

    Object.keys(rawResponse.nodes.datasets).forEach((datasetId) => {
        if (!result.has(datasetId)) {
            result.set(datasetId, [datasetId]);
        }
    });
    return result;
};

const getDatasetContainerNodes = (rawResponse: LineageResponseV1): Node[] => {
    const datasetIdToRelatedDatasetIdsMap =
        getDatasetIdToRelatedDatasetIdsMapping(rawResponse);

    const nodes: Map<string, Node> = new Map();
    datasetIdToRelatedDatasetIdsMap.forEach((relatedDatasetIds) => {
        const containerId = "DATASET-CONTAINER-" + relatedDatasetIds.join("_");
        if (nodes.has(containerId)) {
            return;
        }

        nodes.set(
            containerId,
            getDatasetContainerNode(
                containerId,
                relatedDatasetIds,
                rawResponse,
            ),
        );
    });

    return Array.from(nodes.values());
};

const getDatasetContainerNode = (
    id: string,
    allDatasetIds: string[],
    rawResponse: LineageResponseV1,
): Node => {
    // get schemas of all dataset inside a container, and sort them
    const allSchemas = allDatasetIds
        .map((datasetId) => rawResponse.nodes.datasets[datasetId].schema)
        .filter((schema) => schema != null)
        .sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

    // get latest schemas from all, but update relevance_type if there are many of them
    const latestSchema: IORelationSchemaV1 | null = allSchemas.length
        ? allSchemas[0]
        : null;
    if (latestSchema && latestSchema.relevance_type == "EXACT_MATCH") {
        if (allSchemas.some((schema) => schema.id != latestSchema.id)) {
            latestSchema.relevance_type = "LATEST_KNOWN";
        }
    }

    let hasColumnLineage = false;
    if (rawResponse.relations.direct_column_lineage.length) {
        hasColumnLineage = rawResponse.relations.direct_column_lineage.some(
            (relation) =>
                allDatasetIds.includes(relation.from.id) ||
                allDatasetIds.includes(relation.to.id),
        );
    } else if (rawResponse.relations.indirect_column_lineage.length) {
        hasColumnLineage = rawResponse.relations.indirect_column_lineage.some(
            (relation) =>
                allDatasetIds.includes(relation.from.id) ||
                allDatasetIds.includes(relation.to.id),
        );
    }

    let maxHeight = allDatasetIds.length * BASE_NODE_HEIGHT;
    if (latestSchema && hasColumnLineage) {
        maxHeight +=
            BASE_NODE_HEIGHT * Math.min(latestSchema.fields.length, 10);
    }

    const datasets = allDatasetIds.map((datasetId) =>
        getDataseNode(rawResponse.nodes.datasets[datasetId], rawResponse),
    );

    const maxWidth = Math.max(
        ...datasets.map((dataset) => dataset.initialWidth ?? BASE_NODE_WIDTH),
    );

    return {
        ...getDefaultNode(),
        id: id,
        type: "datasetContainerNode",
        initialHeight: maxHeight,
        initialWidth: maxWidth,
        data: {
            datasets: datasets,
            expanded: hasColumnLineage,
            schema: latestSchema,
        },
    };
};

const getDataseNode = (
    node: DatasetResponseV1,
    rawResponse: LineageResponseV1,
): Node => {
    let title = node.name;
    const subheader = `${node.location.type}://${node.location.name}`;
    if (title.includes("/")) {
        // For path like "/app/warehouse/hive/external/some.db/table"
        // show only "../some.db/table"
        title = ".../" + title.split("/").slice(-2).join("/");
    }

    const maxNameWidth = Math.max(title.length, subheader.length);
    const maxWidth = Math.max(
        maxNameWidth * BASE_NODE_WIDTH_PER_CHAR,
        BASE_NODE_WIDTH,
    );

    return {
        ...getDefaultNode(),
        id: "DATASET-" + node.id,
        type: "datasetNode",
        initialWidth: maxWidth,
        data: {
            ...node,
            kind: "DATASET",
            title: title,
            subheader: subheader,
        },
    };
};

const getJobNode = (
    node: JobResponseV1,
    rawResponse: LineageResponseV1,
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

    Object.values(rawResponse.nodes.runs)
        .filter((other_node) => other_node.job_id == node.id)
        // show most recent operations on top
        .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
        .forEach((run) => {
            run.operations = [];
            runsById.set(run.id, run);
            maxNameWidth = Math.max(maxNameWidth, run.external_id?.length ?? 1);
        });

    Object.values(rawResponse.nodes.operations)
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

const getGraphNodes = (rawResponse: LineageResponseV1): Node[] => {
    return [
        ...getDatasetContainerNodes(rawResponse),
        ...Object.values(rawResponse.nodes.jobs).map((job) =>
            getJobNode(job, rawResponse),
        ),
    ];
};

export default getGraphNodes;
