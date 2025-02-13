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

const getDefaultNode = (node: LineageNodeResponseV1): Node => {
    return {
        id: getNodeId(node),
        type: "default",
        position: { x: 0, y: 0 },
        data: node,
    };
};

const getDataseNode = (node: LineageNodeResponseV1): Node => {
    return {
        ...getDefaultNode(node),
        type: "datasetNode",
    };
};

const getJobNode = (node: LineageNodeResponseV1): Node => {
    return {
        ...getDefaultNode(node),
        type: "jobNode",
    };
};

const getRunNode = (node: LineageNodeResponseV1): Node => {
    return {
        ...getDefaultNode(node),
        type: "runNode",
    };
};

const getOperationNode = (node: LineageNodeResponseV1): Node => {
    return {
        ...getDefaultNode(node),
        type: "operationNode",
    };
};

const getGraphNode = (node: LineageNodeResponseV1): Node => {
    switch (node.kind) {
        case "DATASET":
            return getDataseNode(node);
        case "JOB":
            return getJobNode(node);
        case "RUN":
            return getRunNode(node);
        case "OPERATION":
            return getOperationNode(node);
        default:
            return getDefaultNode(node);
    }
};

const getGraphNodes = (raw_response: LineageResponseV1): Node[] => {
    return raw_response.nodes.map((node) => getGraphNode(node));
};

export default getGraphNodes;
