import {
    LineageRelationResponseV1,
    OutputRelationLineageResponseV1,
    SymlinkRelationLineageResponseV1,
    InputRelationLineageResponseV1,
    ParentRelationLineageResponseV1,
    BaseRelationLineageResponseV1,
    LineageResponseV1,
} from "@/dataProvider/types";
import { Edge, MarkerType } from "@xyflow/react";
import { getNodeId } from "./getGraphNodes";
import formatBytes from "@/utils/bytes";
import formatNumberApprox from "@/utils/numbers";
import { Chip } from "@mui/material";

const STOKE_THICK = 3;
const STOKE_THIN = 1;

export const getEdgeId = (relation: BaseRelationLineageResponseV1): string => {
    // @ts-ignore
    const type = relation.type ?? "";
    return `${getNodeId(relation.from)}-${type}->${getNodeId(relation.to)}`;
};

const getMinimalEdge = (
    relation: BaseRelationLineageResponseV1,
    raw_response: LineageResponseV1,
): Edge => {
    return {
        id: getEdgeId(relation),
        source: getNodeId(relation.from),
        target: getNodeId(relation.to),
        type: "baseEdge",
        // @ts-ignore
        data: relation,
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
        style: {
            strokeWidth: STOKE_THIN,
            stroke: "black",
        },
    };
};

const getParentEdge = (
    relation: ParentRelationLineageResponseV1,
    raw_response: LineageResponseV1,
): Edge => {
    return {
        ...getMinimalEdge(relation, raw_response),
        sourceHandle: "bottom",
        targetHandle: "top",
        label: "PARENT",
    };
};

const getOutputEdge = (
    relation: OutputRelationLineageResponseV1,
    raw_response: LineageResponseV1,
): Edge => {
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
        ...getMinimalEdge(relation, raw_response),
        type: "ioEdge",
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

const getInputEdge = (
    relation: InputRelationLineageResponseV1,
    raw_response: LineageResponseV1,
): Edge => {
    const color = "green";
    return {
        ...getMinimalEdge(relation, raw_response),
        type: "ioEdge",
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
    if (relation.type == "METASTORE") {
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

    // if target node has only outputs (e.g. HDFS is a source for all jobs/runs/... in this graph),
    // draw symlink on the left, to replace complex graphs like these:
    //
    //     /--> Job
    // HDFS
    //     \
    //      <-> Hive
    //
    // with more simple graphs, like these:
    //
    // Hive <-> HDFS -> Job
    const targetRelations = raw_response.relations.filter(
        (r) => r.to.id == relation.to.id || r.from.id == relation.to.id,
    );
    const targetHasOnlyOutputs = targetRelations.every(
        (r) => r.kind == "OUTPUT" || r.kind == "SYMLINK",
    );

    const color = "purple";

    return {
        ...getMinimalEdge(relation, raw_response),
        label: "SYMLINK",
        source: targetHasOnlyOutputs
            ? getNodeId(relation.to)
            : getNodeId(relation.from),
        target: targetHasOnlyOutputs
            ? getNodeId(relation.from)
            : getNodeId(relation.to),
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

const getGraphEdge = (
    relation: LineageRelationResponseV1,
    raw_response: LineageResponseV1,
): Edge | null => {
    switch (relation.kind) {
        case "PARENT":
            return getParentEdge(relation, raw_response);
        case "OUTPUT":
            return getOutputEdge(relation, raw_response);
        case "INPUT":
            return getInputEdge(relation, raw_response);
        case "SYMLINK":
            return getSymlinkEdge(relation, raw_response);
        default:
            return getMinimalEdge(relation, raw_response);
    }
};

const getGraphEdges = (raw_response: LineageResponseV1): Edge[] => {
    const result: Edge[] = [];

    raw_response.relations.forEach((relation) => {
        const edge = getGraphEdge(relation, raw_response);
        if (edge) {
            result.push(edge);
        }
    });

    return result;
};

export default getGraphEdges;
