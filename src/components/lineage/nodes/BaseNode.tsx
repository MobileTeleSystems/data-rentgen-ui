import { Position, Handle, Edge, useReactFlow } from "@xyflow/react";
import { ReactElement, ReactNode } from "react";

import "./styles.css";

import { Card, CardProps, Divider, Stack } from "@mui/material";

const BaseNode = ({
    nodeId,
    icon,
    header,
    ...props
}: {
    nodeId: string;
    icon: ReactNode;
    header: ReactNode;
} & CardProps): ReactElement => {
    const { getEdges } = useReactFlow();

    const isParent = (edge: Edge) => edge.data?.kind == "PARENT";

    const hasInputs = getEdges().some(
        (edge) => edge.source === nodeId && !isParent(edge),
    );
    const hasOutputs = getEdges().some(
        (edge) => edge.target === nodeId && !isParent(edge),
    );
    const hasParents = getEdges().some(
        (edge) => edge.target === nodeId && isParent(edge),
    );
    const hasChildren = getEdges().some(
        (edge) => edge.source === nodeId && isParent(edge),
    );

    return (
        <Card {...props}>
            <Stack direction={"row"} sx={{ alignItems: "center" }}>
                {icon}
                <Divider orientation="vertical" flexItem />
                {header}
            </Stack>
            {hasOutputs && (
                <Handle
                    type="target"
                    id={"left"}
                    position={Position.Left}
                    isConnectable={false}
                />
            )}
            {hasParents && (
                <Handle
                    type="target"
                    id={"top"}
                    position={Position.Top}
                    isConnectable={false}
                />
            )}
            {hasInputs && (
                <Handle
                    type="source"
                    id={"right"}
                    position={Position.Right}
                    isConnectable={false}
                />
            )}
            {hasChildren && (
                <Handle
                    type="source"
                    id={"bottom"}
                    position={Position.Bottom}
                    isConnectable={false}
                />
            )}
        </Card>
    );
};

export default BaseNode;
