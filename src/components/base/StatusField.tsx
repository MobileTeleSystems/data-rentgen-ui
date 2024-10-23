import { ReactElement } from "react";
import { ChipField, ChipFieldProps, useRecordContext } from "react-admin";

const StatusField = ({ ...props }: ChipFieldProps): ReactElement | null => {
    const record = useRecordContext();
    if (!record) return null;

    switch (record.status) {
        case "STARTED":
            return <ChipField color="info" {...props} />;
        case "RUNNING":
            return <ChipField color="primary" {...props} />;
        case "SUCCEEDED":
            return <ChipField color="success" {...props} />;
        case "FAILED":
            return <ChipField color="error" {...props} />;
        case "KILLED":
            return <ChipField color="error" {...props} />;
        case "UNKNOWN":
            return <ChipField color="warning" {...props} />;
        default:
            return <ChipField {...props} />;
    }
};

export default StatusField;
