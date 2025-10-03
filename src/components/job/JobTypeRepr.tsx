import { ReactElement } from "react";
import { Stack, StackProps } from "@mui/material";
import JobTypeIcon from "./JobTypeIcon";
import JobType from "./JobType";

const JobTypeRepr = ({
    jobType,
    ...props
}: { jobType: string } & StackProps): ReactElement | null => {
    return (
        <Stack direction={"column"} {...props}>
            <JobTypeIcon jobType={jobType} />
            <JobType jobType={jobType} />
        </Stack>
    );
};

export default JobTypeRepr;
