import { ReactElement } from "react";
import {
    getBezierPath,
    EdgeLabelRenderer,
    BaseEdge,
    EdgeProps,
} from "@xyflow/react";
import {
    InputRelationLineageResponseV1,
    OutputRelationLineageResponseV1,
} from "@/dataProvider/types";
import formatNumberApprox from "@/utils/numbers";
import formatBytes from "@/utils/bytes";
import { Card, Chip, Typography } from "@mui/material";

const IOEdge = ({
    id,
    /* eslint-disable @typescript-eslint/no-unused-vars */
    label,
    data,
    ...props
}: EdgeProps & {
    data: InputRelationLineageResponseV1 | OutputRelationLineageResponseV1;
}): ReactElement => {
    const [edgePath, labelX, labelY] = getBezierPath(props);

    const hasContent =
        data.type || data.num_rows || data.num_bytes || data.num_files;

    if (!hasContent) {
        return <BaseEdge id={id} path={edgePath} {...props} />;
    }

    return (
        <>
            <BaseEdge id={id} path={edgePath} {...props} />
            <EdgeLabelRenderer>
                <Card
                    style={{
                        padding: 5,
                        textAlign: "center",
                        // required to place label exactly on the edge
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                    }}
                    className="nodrag nopan"
                >
                    {data.type ? (
                        <Chip
                            size="small"
                            color="secondary"
                            label={data.type as string}
                            style={props.labelStyle}
                        />
                    ) : null}
                    {data.num_rows ? (
                        <Typography>
                            {formatNumberApprox(data.num_rows)} rows
                        </Typography>
                    ) : null}
                    {data.num_bytes ? (
                        <Typography>{formatBytes(data.num_bytes)}</Typography>
                    ) : null}
                    {data.num_files ? (
                        <Typography>
                            {formatNumberApprox(data.num_files)} files
                        </Typography>
                    ) : null}
                </Card>
            </EdgeLabelRenderer>
        </>
    );
};

export default IOEdge;
