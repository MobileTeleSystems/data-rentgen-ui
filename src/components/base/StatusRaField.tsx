import {
    OperationDetailedResponseV1,
    RunDetailedResponseV1,
} from "@/dataProvider/types";
import { ReactElement } from "react";
import { ChipFieldProps, useRecordContext } from "react-admin";
import StatusField from "./StatusField";

const StatusRaField = ({
    /* eslint-disable @typescript-eslint/no-unused-vars */
    source,
    sortable,
    children,
    ...chipProps
}: ChipFieldProps): ReactElement | null => {
    const record = useRecordContext<
        RunDetailedResponseV1 | OperationDetailedResponseV1
    >();
    if (!record) return null;

    return <StatusField status={record.data.status} {...chipProps} />;
};

export default StatusRaField;
