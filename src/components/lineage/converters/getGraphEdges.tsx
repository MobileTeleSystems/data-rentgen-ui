import {
    OutputRelationLineageResponseV1,
    InputRelationLineageResponseV1,
    BaseRelationLineageResponseV1,
    DirectColumnLineageRelationLineageResponseV1,
    IndirectColumnLineageRelationLineageResponseV1,
    LineageResponseV1,
    RelationEndpointLineageResponseV1,
} from "@/dataProvider/types";
import { Edge, MarkerType } from "@xyflow/react";
import { getDatasetIdToRelatedDatasetIdsMapping } from "./getGraphNodes";

const STOKE_THICK = 3;
const STOKE_MEDIUM = 1;
const STOKE_THIN = 0.5;
const MAX_ANIMATED_EDGES = 50;

const getNodeId = (node: RelationEndpointLineageResponseV1): string => {
    return node.kind + "-" + node.id;
};

const getEdgeId = (relation: BaseRelationLineageResponseV1): string => {
    // @ts-expect-error Type field may be present in some relation types
    const type = relation.type ?? "";
    return `${getNodeId(relation.from)}-${type}->${getNodeId(relation.to)}`;
};

const getMinimalEdge = (relation: BaseRelationLineageResponseV1): Edge => {
    return {
        id: getEdgeId(relation),
        source: getNodeId(relation.from),
        target: getNodeId(relation.to),
        type: "baseEdge",
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
        style: {
            strokeWidth: STOKE_THIN,
            stroke: "black",
        },
    };
};

const getOutputEdgeColor = (
    relation: OutputRelationLineageResponseV1,
): string => {
    for (const type of relation.types) {
        switch (type) {
            case "DELETE":
            case "DROP":
            case "TRUNCATE":
                return "red";
            case "ALTER":
            case "RENAME":
                return "orange";
        }
    }
    return "green";
};

const getOutputEdge = (
    relation: OutputRelationLineageResponseV1,
    datasetIdToContainerIdMapping: Map<string, string>,
    rawResponse: LineageResponseV1,
): Edge => {
    let source: string = getNodeId(relation.from);
    let sourceHandle: string | null = null;
    let strokeWidth = STOKE_THICK;

    if (relation.from.kind == "DATASET") {
        source = datasetIdToContainerIdMapping.get(relation.from.id)!;
        sourceHandle = "DATASET-" + relation.from.id;
    }

    if (relation.from.kind == "OPERATION") {
        const operation = rawResponse.nodes.operations[relation.from.id];
        const run = rawResponse.nodes.runs[operation.run_id];

        source = getNodeId({ kind: "JOB", id: run.job_id });
        sourceHandle = "OPERATION-" + operation.id;
    }

    if (relation.from.kind == "RUN") {
        const run = rawResponse.nodes.runs[relation.from.id];

        source = getNodeId({ kind: "JOB", id: run.job_id });
        sourceHandle = "RUN-" + run.id;

        if (Object.keys(rawResponse.nodes.operations).length > 0) {
            strokeWidth = STOKE_MEDIUM;
        }
    }

    if (relation.from.kind == "JOB") {
        if (Object.keys(rawResponse.nodes.operations).length > 0) {
            strokeWidth = STOKE_THIN;
        } else if (Object.keys(rawResponse.nodes.runs).length > 0) {
            strokeWidth = STOKE_MEDIUM;
        }
    }

    const color = getOutputEdgeColor(relation);

    // Too many animated edges is heavy load for browser
    const totalIOEdges =
        rawResponse.relations.outputs.length +
        rawResponse.relations.inputs.length;
    const animated = totalIOEdges <= MAX_ANIMATED_EDGES;

    const containerTo = datasetIdToContainerIdMapping.get(relation.to.id)!;
    return {
        ...getMinimalEdge(relation),
        id: `${source}:${sourceHandle ?? "*"}->${getNodeId(relation.to)}`,
        source: source,
        sourceHandle: sourceHandle,
        target: containerTo,
        targetHandle: getNodeId(relation.to),
        type: "ioEdge",
        data: {
            ...relation,
            kind: "OUTPUT",
        },
        animated: animated,
        markerEnd: {
            type: MarkerType.ArrowClosed,
            color: color,
        },
        style: {
            strokeWidth: strokeWidth,
            stroke: color,
        },
        labelStyle: {
            backgroundColor: color,
        },
    };
};

const getInputEdge = (
    relation: InputRelationLineageResponseV1,
    datasetIdToContainerIdMapping: Map<string, string>,
    rawResponse: LineageResponseV1,
): Edge => {
    let target: string = getNodeId(relation.to);
    let targetHandle: string | null = null;
    let strokeWidth = STOKE_THICK;

    if (relation.to.kind == "OPERATION") {
        const operation = rawResponse.nodes.operations[relation.to.id];
        const run = rawResponse.nodes.runs[operation.run_id];

        target = getNodeId({ kind: "JOB", id: run.job_id });
        targetHandle = "OPERATION-" + operation.id;
    }
    if (relation.to.kind == "RUN") {
        const run = rawResponse.nodes.runs[relation.to.id];

        target = getNodeId({ kind: "JOB", id: run.job_id });
        targetHandle = "RUN-" + run.id;

        if (Object.keys(rawResponse.nodes.operations).length > 0) {
            strokeWidth = STOKE_MEDIUM;
        }
    }
    if (relation.to.kind == "JOB") {
        if (Object.keys(rawResponse.nodes.operations).length > 0) {
            strokeWidth = STOKE_THIN;
        } else if (Object.keys(rawResponse.nodes.runs).length > 0) {
            strokeWidth = STOKE_MEDIUM;
        }
    }
    if (relation.to.kind == "DATASET") {
        target = datasetIdToContainerIdMapping.get(relation.to.id)!;
        targetHandle = "DATASET-" + relation.to.id;
    }

    const color = "green";

    // Too many animated edges is heavy load for browser
    const totalIOEdges =
        rawResponse.relations.outputs.length +
        rawResponse.relations.inputs.length;
    const animated = totalIOEdges <= MAX_ANIMATED_EDGES;

    const containerFrom = datasetIdToContainerIdMapping.get(relation.from.id)!;
    return {
        ...getMinimalEdge(relation),
        id: `${getNodeId(relation.from)}->${target}:${targetHandle ?? "*"}`,
        source: containerFrom,
        sourceHandle: getNodeId(relation.from),
        target: target,
        targetHandle: targetHandle,
        type: "ioEdge",
        data: {
            ...relation,
            kind: "INPUT",
        },
        animated: animated,
        markerEnd: {
            type: MarkerType.ArrowClosed,
            color: color,
        },
        style: {
            strokeWidth: strokeWidth,
            stroke: color,
        },
        labelStyle: {
            backgroundColor: color,
        },
    };
};

const getColumnLineageEdge = (
    relation: BaseRelationLineageResponseV1,
    datasetIdToContainerIdMapping: Map<string, string>,
    kind: "DIRECT_COLUMN_LINEAGE" | "INDIRECT_COLUMN_LINEAGE",
    types: string[],
    sourceFieldName: string,
    targetFieldName: string | null,
): Edge => {
    const color = "gray";
    const containerFrom = datasetIdToContainerIdMapping.get(relation.from.id)!;
    const containerTo = datasetIdToContainerIdMapping.get(relation.to.id)!;
    return {
        ...getMinimalEdge(relation),
        id: `${containerFrom}:${sourceFieldName}--COLUMN-LINEAGE-->${containerTo}:${targetFieldName ?? "*"}`,
        source: containerFrom,
        sourceHandle: sourceFieldName,
        target: containerTo,
        targetHandle: targetFieldName,
        type: "columnLineageEdge",
        data: {
            source_field: sourceFieldName,
            target_field: targetFieldName,
            types: types,
            kind: kind,
        },
        markerEnd: {
            type: MarkerType.ArrowClosed,
            color: color,
        },
        style: {
            strokeWidth: STOKE_THIN,
            stroke: color,
        },
        labelStyle: {
            // label is shown only then edge is selected, so color is different from stroke
            backgroundColor: "#89b2f3",
        },
    };
};

const combineTypes = (
    existingTypes: string[],
    newTypes: string[],
): string[] => {
    const types = [...existingTypes];
    for (const type of newTypes) {
        if (!types.includes(type)) {
            types.push(type);
        }
    }
    return types;
};

const getDirectColumnLineageEdges = (
    relation: DirectColumnLineageRelationLineageResponseV1,
    datasetIdToContainerIdMapping: Map<string, string>,
): Edge[] => {
    return Object.keys(relation.fields).flatMap((target_field_name) => {
        return relation.fields[target_field_name].map((source_field) =>
            getColumnLineageEdge(
                relation,
                datasetIdToContainerIdMapping,
                "DIRECT_COLUMN_LINEAGE",
                source_field.types,
                source_field.field,
                target_field_name,
            ),
        );
    });
};

const getIndirectColumnLineageEdges = (
    relation: IndirectColumnLineageRelationLineageResponseV1,
    datasetIdToContainerIdMapping: Map<string, string>,
): Edge[] => {
    return relation.fields.map((source_field) => {
        return getColumnLineageEdge(
            relation,
            datasetIdToContainerIdMapping,
            "INDIRECT_COLUMN_LINEAGE",
            source_field.types,
            source_field.field,
            null,
        );
    });
};

const mergeColumnLineageEdges = (edges: Edge[]): Edge[] => {
    const grouped: Map<string, Edge> = new Map();

    edges.forEach((edge) => {
        if (!grouped.has(edge.id)) {
            grouped.set(edge.id, edge);
            return;
        }

        const existingEdge = grouped.get(edge.id)!;
        const existingTypes = existingEdge.data!.types as string[];
        const newTypes = edge.data!.types as string[];
        existingEdge.data!.types = combineTypes(existingTypes, newTypes);
        grouped.set(edge.id, existingEdge);
    });

    return Array.from(grouped.values());
};

const getGraphEdges = (rawResponse: LineageResponseV1): Edge[] => {
    const datasetIdToContainerIdMapping: Map<string, string> = new Map();
    getDatasetIdToRelatedDatasetIdsMapping(rawResponse).forEach(
        (allDatasetIds, datasetId) => {
            datasetIdToContainerIdMapping.set(
                datasetId,
                "DATASET-CONTAINER-" + allDatasetIds.join("_"),
            );
        },
    );

    const ioEdges: Edge[] = [
        ...rawResponse.relations.inputs.map((relation) =>
            getInputEdge(relation, datasetIdToContainerIdMapping, rawResponse),
        ),
        ...rawResponse.relations.outputs.map((relation) =>
            getOutputEdge(relation, datasetIdToContainerIdMapping, rawResponse),
        ),
    ];

    const columnLineage: Edge[] = [
        ...rawResponse.relations.direct_column_lineage.flatMap((relation) =>
            getDirectColumnLineageEdges(
                relation,
                datasetIdToContainerIdMapping,
            ),
        ),
        ...rawResponse.relations.indirect_column_lineage.flatMap((relation) =>
            getIndirectColumnLineageEdges(
                relation,
                datasetIdToContainerIdMapping,
            ),
        ),
    ];

    return [...ioEdges, ...mergeColumnLineageEdges(columnLineage)];
};

export default getGraphEdges;
