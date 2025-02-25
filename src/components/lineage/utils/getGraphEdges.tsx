import {
    OutputRelationLineageResponseV1,
    SymlinkRelationLineageResponseV1,
    InputRelationLineageResponseV1,
    ParentRelationLineageResponseV1,
    BaseRelationLineageResponseV1,
    LineageResponseV1,
    RelationEndpointLineageResponseV1,
} from "@/dataProvider/types";
import { Edge, MarkerType } from "@xyflow/react";

const STOKE_THICK = 3;
const STOKE_MEDIUM = 1;
const STOKE_THIN = 0.5;

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

const getParentEdge = (relation: ParentRelationLineageResponseV1): Edge => {
    return {
        ...getMinimalEdge(relation),
        label: "PARENT",
        data: {
            ...relation,
            kind: "PARENT",
        },
        sourceHandle: "bottom",
        targetHandle: "top",
    };
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

    let color = "green";
    switch (relation.type) {
        case "DROP":
        case "TRUNCATE":
            color = "red";
            break;
        case "ALTER":
        case "RENAME":
            color = "yellow";
            break;
        default:
            color = "green";
    }

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
        animated: true,
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
        animated: true,
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
    raw_response: LineageResponseV1,
): Edge | null => {
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
        return null;
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
    const anyTargetInput = raw_response.relations.inputs.find(
        (r) => r.from.id == relation.to.id,
    );
    const anyTargetOutput = raw_response.relations.outputs.find(
        (r) => r.to.id == relation.to.id,
    );
    const anyTargetSymlink = raw_response.relations.symlinks.find(
        (r) => r.to.id == relation.to.id || r.from.id == relation.to.id,
    );
    const targetHasOnlyOutputs =
        (!!anyTargetOutput || !!anyTargetSymlink) && !anyTargetInput;

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
            strokeWidth: STOKE_THIN,
            stroke: color,
        },
        labelStyle: {
            backgroundColor: color,
        },
    };
};

const getGraphEdges = (raw_response: LineageResponseV1): Edge[] => {
    return [
        ...raw_response.relations.parents.map(getParentEdge),
        ...raw_response.relations.inputs.map((relation) =>
            getInputEdge(relation, raw_response),
        ),
        ...raw_response.relations.outputs.map((relation) =>
            getOutputEdge(relation, raw_response),
        ),
        ...raw_response.relations.symlinks
            .map((relation) => getSymlinkEdge(relation, raw_response))
            .filter((edge) => edge !== null),
    ];
};

export default getGraphEdges;
