import { ReactElement } from "react";
import { FieldProps, useRecordContext } from "react-admin";
import JobIconWithType from "./JobIconWithType";
import { JobResponseV1 } from "@/dataProvider/types";

/* eslint-disable @typescript-eslint/no-unused-vars */
const JobRaTypeField = (props: FieldProps): ReactElement | null => {
    const record = useRecordContext<JobResponseV1>();
    if (!record) {
        return null;
    }
    return <JobIconWithType job={record} />;
};

export default JobRaTypeField;
