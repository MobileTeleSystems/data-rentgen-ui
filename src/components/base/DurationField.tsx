import { ReactElement } from "react";
import { FieldProps, FunctionField } from "react-admin";

import { getDurationText } from "@/utils/datetime";

const DurationField = (props: FieldProps): ReactElement => {
    return (
        <FunctionField
            render={(record) => {
                return getDurationText({
                    created_at: record.created_at,
                    started_at: record.started_at,
                    ended_at: record.ended_at,
                });
            }}
            {...props}
        />
    );
};

export default DurationField;
