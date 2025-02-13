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
const STOKE_THIN = 1;

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

const getOutputEdge = (relation: OutputRelationLineageResponseV1): Edge => {
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
            strokeWidth: STOKE_THICK,
            stroke: color,
        },
        labelStyle: {
            backgroundColor: color,
        },
    };
};

const getInputEdge = (relation: InputRelationLineageResponseV1): Edge => {
    const color = "green";
    return {
        ...getMinimalEdge(relation),
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
            strokeWidth: STOKE_THICK,
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
        ...raw_response.relations.inputs.map(getInputEdge),
        ...raw_response.relations.outputs.map(getOutputEdge),
        ...raw_response.relations.symlinks
            .map((relation) => getSymlinkEdge(relation, raw_response))
            .filter((edge) => edge !== null),
    ];
};

export default getGraphEdges;
