import { ReactElement } from "react";
import {
    getBezierPath,
    EdgeLabelRenderer,
    BaseEdge as ReactFlowBaseEdge,
    EdgeProps,
} from "@xyflow/react";
import { ColumnLineageFieldResponseV1 } from "@/dataProvider/types";
import { Chip } from "@mui/material";

import "./ColumnLineageEdge.css";
import { useTranslate } from "react-admin";

const ColumnLineageEdge = ({
    id,
    /* eslint-disable @typescript-eslint/no-unused-vars */
    label,
    data,
    selected,
    ...props
}: EdgeProps & {
    data: ColumnLineageFieldResponseV1;
}): ReactElement => {
    const translate = useTranslate();
    const [edgePath, labelX, labelY] = getBezierPath(props);

    const types = data.types.map((type) =>
        translate(`edges.columnLineageTypes.${type}`, { _: type }),
    );

    return (
        <>
            <ReactFlowBaseEdge id={id} path={edgePath} {...props} />
            {selected ? (
                <EdgeLabelRenderer>
                    <div
                        style={{
                            textAlign: "center",
                            // required to place label exactly on the edge
                            position: "absolute",
                            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        }}
                        className={`nodrag nopan ${selected ? "selected" : ""}`}
                    >
                        <Chip
                            size="small"
                            color="secondary"
                            label={types.join(", ")}
                            style={props.labelStyle}
                        />
                    </div>
                </EdgeLabelRenderer>
            ) : null}
        </>
    );
};

export default ColumnLineageEdge;
