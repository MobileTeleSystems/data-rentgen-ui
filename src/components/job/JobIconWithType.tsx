import { ReactElement } from "react";
import { JobResponseV1 } from "@/dataProvider/types";
import { Stack, StackProps } from "@mui/material";
import JobIcon from "./JobIcon";
import JobType from "./JobType";

const JobIconWithType = ({
    job,
    ...props
}: {
    job: JobResponseV1;
} & StackProps): ReactElement | null => {
    return (
        <Stack direction={"column"} {...props}>
            <JobIcon job={job} />
            <JobType job={job} />
        </Stack>
    );
};

export default JobIconWithType;
