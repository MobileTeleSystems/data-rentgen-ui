import {
    OutputRelationLineageResponseV1,
    SymlinkRelationLineageResponseV1,
    InputRelationLineageResponseV1,
    BaseRelationLineageResponseV1,
    DirectColumnLineageRelationLineageResponseV1,
    IndirectColumnLineageRelationLineageResponseV1,
    LineageResponseV1,
    RelationEndpointLineageResponseV1,
    IORelationSchemaV1,
    IORelationSchemaFieldV1,
} from "@/dataProvider/types";
import { Edge, MarkerType } from "@xyflow/react";
import { flattenFields } from "../nodes/dataset_node/utils";

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
            case "DROP":
            case "TRUNCATE":
                return "red";
            case "ALTER":
            case "RENAME":
                return "yellow";
        }
    }
    return "green";
};

const getOutputEdge = (
    relation: OutputRelationLineageResponseV1,
    raw_response: LineageResponseV1,
): Edge => {
    let source: string = getNodeId(relation.from);
    let sourceHandle: string | null = null;
    let strokeWidth = STOKE_THICK;

    if (relation.from.kind == "OPERATION") {
        const operation = raw_response.nodes.operations[relation.from.id];
        const run = raw_response.nodes.runs[operation.run_id];

        source = getNodeId({ kind: "JOB", id: run.job_id });
        sourceHandle = "OPERATION-" + operation.id;
    }

    if (relation.from.kind == "RUN") {
        const run = raw_response.nodes.runs[relation.from.id];

        source = getNodeId({ kind: "JOB", id: run.job_id });
        sourceHandle = "RUN-" + run.id;

        if (Object.keys(raw_response.nodes.operations).length > 0) {
            strokeWidth = STOKE_MEDIUM;
        }
    }

    if (relation.from.kind == "JOB") {
        if (Object.keys(raw_response.nodes.operations).length > 0) {
            strokeWidth = STOKE_THIN;
        } else if (Object.keys(raw_response.nodes.runs).length > 0) {
            strokeWidth = STOKE_MEDIUM;
        }
    }

    const color = getOutputEdgeColor(relation);

    // Too many animated edges is heavy load for browser
    const totalIOEdges =
        raw_response.relations.outputs.length +
        raw_response.relations.inputs.length;
    const animated = totalIOEdges <= MAX_ANIMATED_EDGES;

    return {
        ...getMinimalEdge(relation),
        id: `${source}:${sourceHandle ?? "*"}->${getNodeId(relation.to)}`,
        source: source,
        sourceHandle: sourceHandle,
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
    raw_response: LineageResponseV1,
): Edge => {
    let target: string = getNodeId(relation.to);
    let targetHandle: string | null = null;
    let strokeWidth = STOKE_THICK;

    if (relation.to.kind == "OPERATION") {
        const operation = raw_response.nodes.operations[relation.to.id];
        const run = raw_response.nodes.runs[operation.run_id];

        target = getNodeId({ kind: "JOB", id: run.job_id });
        targetHandle = "OPERATION-" + operation.id;
    }
    if (relation.to.kind == "RUN") {
        const run = raw_response.nodes.runs[relation.to.id];

        target = getNodeId({ kind: "JOB", id: run.job_id });
        targetHandle = "RUN-" + run.id;

        if (Object.keys(raw_response.nodes.operations).length > 0) {
            strokeWidth = STOKE_MEDIUM;
        }
    }
    if (relation.to.kind == "JOB") {
        if (Object.keys(raw_response.nodes.operations).length > 0) {
            strokeWidth = STOKE_THIN;
        } else if (Object.keys(raw_response.nodes.runs).length > 0) {
            strokeWidth = STOKE_MEDIUM;
        }
    }
    const color = "green";

    // Too many animated edges is heavy load for browser
    const totalIOEdges =
        raw_response.relations.outputs.length +
        raw_response.relations.inputs.length;
    const animated = totalIOEdges <= MAX_ANIMATED_EDGES;
    return {
        ...getMinimalEdge(relation),
        id: `${getNodeId(relation.from)}->${target}:${targetHandle ?? "*"}`,
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

const getSymlinkEdge = (
    relation: SymlinkRelationLineageResponseV1,
    targetHasOnlyOutputs: boolean,
): Edge => {
    const color = "purple";
    return {
        ...getMinimalEdge(relation),
        label: "SYMLINK",
        source: targetHasOnlyOutputs
            ? getNodeId(relation.to)
            : getNodeId(relation.from),
        target: targetHasOnlyOutputs
            ? getNodeId(relation.from)
            : getNodeId(relation.to),
        data: {
            ...relation,
            kind: "SYMLINK",
        },
        markerStart: {
            type: MarkerType.ArrowClosed,
            color: color,
        },
        markerEnd: {
            type: MarkerType.ArrowClosed,
            color: color,
        },
        style: {
            strokeWidth: STOKE_MEDIUM,
            stroke: color,
        },
        labelStyle: {
            backgroundColor: color,
        },
    };
};

const getSymlinkEdges = (
    relation: SymlinkRelationLineageResponseV1,
    raw_response: LineageResponseV1,
): Edge[] => {
    if (relation.type == "WAREHOUSE") {
        // having 2 edges between same nodes leads to confusing cross links like those:
        //
        // >HDFS<
        //  \  /
        //   \/
        //   /\
        //  /  \
        // >Hive<
        //
        // To avoid that, keep only one symlink, at least for now.
        return [];
    }

    // if target node has only outputs (e.g. Hive is a source for all jobs/runs/... in this graph),
    // draw symlink on the left, to replace complex graphs like these:
    //
    //     /--> Job
    // Hive
    //     \
    //      <-> HDFS
    //
    // with more simple graphs, like these:
    //
    // HDFS <-> Hive -> Job
    const anyTargetSymlink = raw_response.relations.symlinks.find(
        (r) => r.to.id == relation.to.id || r.from.id == relation.to.id,
    );
    const targetInputs = raw_response.relations.inputs.filter(
        (r) => r.from.id == relation.to.id,
    );
    const targetOutputs = raw_response.relations.outputs.filter(
        (r) => r.to.id == relation.to.id,
    );

    const targetHasOnlyOutputs =
        (!!targetInputs.length || !!anyTargetSymlink) && !targetOutputs.length;

    const results: Edge[] = [getSymlinkEdge(relation, targetHasOnlyOutputs)];

    /*
    Connect each field of SYMLINK source to each field of target:

        dataset1      dataset2  -  SYMLINK -  dataset3  -  dataset4
        [column1]  - [column1]  ------------  [column1] -  [column1]
                        [column2]  ------------  [column2] -  [column2]

    Without this column lineage is fractured:

        dataset1      dataset2  -  SYMLINK -  dataset3  -  dataset4
        [column1]  - [column1]                [column1] -  [column1]
                        [column2]                [column2] -  [column2]
    */
    const sourceInputs = raw_response.relations.inputs.filter(
        (r) => r.from.id == relation.from.id,
    );
    const sourceOutputs = raw_response.relations.outputs.filter(
        (r) => r.to.id == relation.from.id,
    );

    const allSchemas = [
        ...targetOutputs,
        ...sourceOutputs,
        ...targetInputs,
        ...sourceInputs,
    ]
        .map((io) => io.schema)
        .filter((schema) => schema !== null);

    const fieldsSet = new Set<string>();
    for (const schema of allSchemas) {
        for (const field of flattenFields(schema.fields)) {
            fieldsSet.add(field.name);
        }
    }
    const fields = Array.from(fieldsSet);

    if (fields.length) {
        results.push(
            ...fields.map((field) =>
                getColumnLineageEdge(
                    relation,
                    "DIRECT_COLUMN_LINEAGE",
                    ["IDENTITY"],
                    field,
                    field,
                ),
            ),
        );
    }

    return results;
};

const getColumnLineageEdge = (
    relation: BaseRelationLineageResponseV1,
    kind: "DIRECT_COLUMN_LINEAGE" | "INDIRECT_COLUMN_LINEAGE",
    types: string[],
    sourceFieldName: string,
    targetFieldName: string | null,
): Edge => {
    const color = "gray";
    return {
        ...getMinimalEdge(relation),
        id: `${getNodeId(relation.from)}:${sourceFieldName}--COLUMN-LINEAGE-->${getNodeId(relation.to)}:${targetFieldName ?? "*"}`,
        sourceHandle: sourceFieldName,
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

const getDirectColumnLineageEdges = (
    relation: DirectColumnLineageRelationLineageResponseV1,
): Edge[] => {
    return Object.keys(relation.fields).flatMap((target_field_name) => {
        return relation.fields[target_field_name].map((source_field) =>
            getColumnLineageEdge(
                relation,
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
): Edge[] => {
    return relation.fields.map((source_field) => {
        return getColumnLineageEdge(
            relation,
            "INDIRECT_COLUMN_LINEAGE",
            source_field.types,
            source_field.field,
            null,
        );
    });
};

const getGraphEdges = (raw_response: LineageResponseV1): Edge[] => {
    return [
        ...raw_response.relations.inputs.map((relation) =>
            getInputEdge(relation, raw_response),
        ),
        ...raw_response.relations.outputs.map((relation) =>
            getOutputEdge(relation, raw_response),
        ),
        ...raw_response.relations.symlinks.flatMap((relation) =>
            getSymlinkEdges(relation, raw_response),
        ),
        ...raw_response.relations.direct_column_lineage.flatMap(
            getDirectColumnLineageEdges,
        ),
        ...raw_response.relations.indirect_column_lineage.flatMap(
            getIndirectColumnLineageEdges,
        ),
    ];
};

export default getGraphEdges;
