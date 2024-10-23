import { ReactElement } from "react";
import { FieldProps, FunctionField } from "react-admin";

const getDuration = (startTime: Date, endTime: Date): string => {
    // @ts-ignore
    const differenceInSeconds = Math.abs(endTime - startTime) / 1000;

    const hours = Math.floor(differenceInSeconds / 60 / 60);
    const minutes = Math.floor(differenceInSeconds / 60) - hours * 60;
    const seconds =
        Math.floor(differenceInSeconds) - hours * 60 * 60 - minutes * 60;

    if (hours) return `${hours}h ${minutes}m ${seconds}s`;
    if (minutes) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
};

const DurationField = (
    props: {
        start_field: string;
        end_field: string;
    } & FieldProps,
): ReactElement => {
    const { start_field, end_field, ...rest } = props;
    return (
        <FunctionField
            render={(record) => {
                if (!record[start_field] || !record[end_field]) {
                    return null;
                }
                return getDuration(
                    new Date(record[start_field]),
                    new Date(record[end_field]),
                );
            }}
            {...rest}
        />
    );
};

export default DurationField;
