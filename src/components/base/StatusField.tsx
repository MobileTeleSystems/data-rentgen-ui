import {
    OperationDetailedResponseV1,
    RunDetailedResponseV1,
} from "@/dataProvider/types";
import { ReactElement } from "react";
import { ChipField, ChipFieldProps, useRecordContext } from "react-admin";

const statusToColorMap = {
    STARTED: "info",
    RUNNING: "primary",
    SUCCEEDED: "success",
    FAILED: "error",
    KILLED: "error",
    UNKNOWN: "warning",
} as const;

const StatusField = ({
    /* eslint-disable @typescript-eslint/no-unused-vars */
    source,
    ...props
}: ChipFieldProps): ReactElement | null => {
    const record = useRecordContext<
        RunDetailedResponseV1 | OperationDetailedResponseV1
    >();
    if (!record) return null;

    const color = statusToColorMap[record.data.status];
    return <ChipField color={color} source="data.status" {...props} />;
};

export default StatusField;
