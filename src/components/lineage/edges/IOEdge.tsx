import { ReactElement } from "react";
import {
    getBezierPath,
    EdgeLabelRenderer,
    BaseEdge as ReactFlowBaseEdge,
    EdgeProps,
} from "@xyflow/react";
import {
    InputRelationLineageResponseV1,
    OutputRelationLineageResponseV1,
} from "@/dataProvider/types";
import { Card, Chip, Typography } from "@mui/material";

import "./IOEdge.css";
import { useTranslate } from "react-admin";
import {
    ByteCountField,
    FileCountField,
    RowCountField,
} from "@/components/base";

const IOEdge = ({
    id,
    /* eslint-disable @typescript-eslint/no-unused-vars */
    label,
    data,
    selected,
    ...props
}: EdgeProps & {
    data: InputRelationLineageResponseV1 | OutputRelationLineageResponseV1;
}): ReactElement => {
    const translate = useTranslate();
    const [edgePath, labelX, labelY] = getBezierPath(props);

    const hasContent =
        data.types || data.num_rows || data.num_bytes || data.num_files;

    if (!hasContent) {
        return <ReactFlowBaseEdge id={id} path={edgePath} {...props} />;
    }

    const types = ((data.types ?? []) as string[]).map((type) =>
        translate(`edges.ioTypes.${type}`, { _: type }),
    );

    return (
        <>
            <ReactFlowBaseEdge id={id} path={edgePath} {...props} />
            <EdgeLabelRenderer>
                <Card
                    style={{
                        padding: 5,
                        textAlign: "center",
                        // required to place label exactly on the edge
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                    }}
                    className={`nodrag nopan ${selected ? "selected" : ""}`}
                >
                    {types.length ? (
                        <Chip
                            size="small"
                            color="secondary"
                            label={types.join(", ")}
                            style={props.labelStyle}
                        />
                    ) : null}
                    {data.num_rows ? (
                        <Typography>
                            <RowCountField rows={data.num_rows} />
                        </Typography>
                    ) : null}
                    {data.num_bytes ? (
                        <Typography>
                            <ByteCountField bytes={data.num_bytes} />
                        </Typography>
                    ) : null}
                    {data.num_files ? (
                        <Typography>
                            <FileCountField files={data.num_files} />
                        </Typography>
                    ) : null}
                </Card>
            </EdgeLabelRenderer>
        </>
    );
};

export default IOEdge;
