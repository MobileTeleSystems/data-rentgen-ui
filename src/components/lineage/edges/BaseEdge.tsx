import { ReactElement } from "react";
import {
    getBezierPath,
    EdgeLabelRenderer,
    BaseEdge as ReactFlowBaseEdge,
    EdgeProps,
} from "@xyflow/react";
import { Chip } from "@mui/material";

import "./BaseEdge.css";

const BaseEdge = ({
    id,
    label,
    selected,
    ...props
}: EdgeProps): ReactElement => {
    const [edgePath, labelX, labelY] = getBezierPath(props);

    return (
        <>
            <ReactFlowBaseEdge id={id} path={edgePath} {...props} />
            {label && (
                <EdgeLabelRenderer>
                    <div
                        style={{
                            // required to place label exactly on the edge
                            position: "absolute",
                            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        }}
                        className={`nodrag nopan ${selected ? "selected" : ""}`}
                    >
                        <Chip
                            size="small"
                            color="info"
                            label={label}
                            style={props.labelStyle}
                        />
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
};

export default BaseEdge;
