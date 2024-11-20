import { Position, Handle, Edge, useReactFlow } from "@xyflow/react";
import { ReactElement, ReactNode, useState } from "react";

import "./BaseNode.css";
import {
    Card,
    CardActions,
    CardContent,
    CardProps,
    Collapse,
    Divider,
    Stack,
} from "@mui/material";
import ShowMoreButton from "./ShowMoreButton";

const BaseNode = ({
    nodeId,
    icon,
    header,
    expandableContent = null,
    ...props
}: {
    nodeId: string;
    icon: ReactNode;
    header: ReactNode;
    expandableContent?: ReactNode | null;
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

    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card {...props}>
            <Stack direction={"row"} sx={{ alignItems: "center" }}>
                {icon}
                <Divider orientation="vertical" flexItem />
                {header}
                {expandableContent && (
                    <CardActions disableSpacing>
                        <ShowMoreButton
                            isExpanded={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        />
                    </CardActions>
                )}
            </Stack>
            {expandableContent && (
                <>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>{expandableContent}</CardContent>
                    </Collapse>
                </>
            )}
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
