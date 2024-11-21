import { ReactElement } from "react";
import { Stack } from "@mui/material";
import { useRecordContext } from "react-admin";
import JobIcon from "./JobIcon";
import { JobResponseV1 } from "@/dataProvider/types";

const JobRaRepr = (): ReactElement | null => {
    const job = useRecordContext<JobResponseV1>();
    if (!job) return null;

    return (
        <Stack
            direction={"row"}
            spacing={1}
            sx={{
                // using inline-flex to avoid expanding link to the full width of table column
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "underline",
            }}
        >
            <JobIcon job={job} />
            <span>{job.name}</span>
        </Stack>
    );
};
export default JobRaRepr;
