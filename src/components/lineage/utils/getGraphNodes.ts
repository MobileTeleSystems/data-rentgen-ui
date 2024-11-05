import {
    LineageNodeResponseV1,
    LineageResponseV1,
    RelationEndpointLineageResponseV1,
} from "@/dataProvider/types";
import { Node } from "@xyflow/react";

export const getNodeId = (
    node: LineageNodeResponseV1 | RelationEndpointLineageResponseV1,
): string => {
    return node.kind + "-" + node.id;
};

const getDefaultNode = (
    node: LineageNodeResponseV1,
    raw_response: LineageResponseV1,
): Node => {
    return {
        id: getNodeId(node),
        type: "default",
        position: { x: 0, y: 0 },
        data: node,
    };
};

const getDataseNode = (
    node: LineageNodeResponseV1,
    raw_response: LineageResponseV1,
): Node => {
    return {
        ...getDefaultNode(node, raw_response),
        type: "datasetNode",
    };
};

const getJobNode = (
    node: LineageNodeResponseV1,
    raw_response: LineageResponseV1,
): Node => {
    return {
        ...getDefaultNode(node, raw_response),
        type: "jobNode",
    };
};

const getRunNode = (
    node: LineageNodeResponseV1,
    raw_response: LineageResponseV1,
): Node => {
    return {
        ...getDefaultNode(node, raw_response),
        type: "runNode",
    };
};

const getOperationNode = (
    node: LineageNodeResponseV1,
    raw_response: LineageResponseV1,
): Node => {
    return {
        ...getDefaultNode(node, raw_response),
        type: "operationNode",
    };
};

const getGraphNode = (
    node: LineageNodeResponseV1,
    raw_response: LineageResponseV1,
): Node => {
    switch (node.kind) {
        case "DATASET":
            return getDataseNode(node, raw_response);
        case "JOB":
            return getJobNode(node, raw_response);
        case "RUN":
            return getRunNode(node, raw_response);
        case "OPERATION":
            return getOperationNode(node, raw_response);
        default:
            return getDefaultNode(node, raw_response);
    }
};

const getGraphNodes = (raw_response: LineageResponseV1): Node[] => {
    return raw_response.nodes.map((node) => getGraphNode(node, raw_response));
};

export default getGraphNodes;
