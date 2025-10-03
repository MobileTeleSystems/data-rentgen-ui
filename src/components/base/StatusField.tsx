import { ReactNode } from "react";
import Chip, { ChipProps } from "@mui/material/Chip";
import { useTranslate } from "react-admin";

const statusToColorMap = {
    STARTED: "info",
    RUNNING: "primary",
    SUCCEEDED: "success",
    FAILED: "error",
    KILLED: "secondary",
    UNKNOWN: "warning",
} as const;

const StatusField = ({
    status,
    ...props
}: { status: keyof typeof statusToColorMap } & ChipProps): ReactNode | null => {
    const translate = useTranslate();

    const color = statusToColorMap[status];
    const value = translate(`statuses.${status}`, { _: status });
    return <Chip color={color} label={value} {...props} />;
};

export default StatusField;
