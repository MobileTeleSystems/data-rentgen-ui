import { ReactElement } from "react";
import { ApacheAirflowIcon, ApacheSparkIcon } from "@/components/icons";
import { useRecordContext, useTranslate } from "react-admin";
import { JobResponseV1 } from "@/dataProvider/types";
import { QuestionMark } from "@mui/icons-material";
import { Stack } from "@mui/material";

const JobIconWithText = (): ReactElement | null => {
    const record = useRecordContext<JobResponseV1>();
    if (!record) {
        return null;
    }

    const translate = useTranslate();

    switch (record.type) {
        case "SPARK_APPLICATION":
            return (
                <Stack>
                    <ApacheSparkIcon />
                    {translate(`resources.jobs.types.spark.application`)}
                </Stack>
            );
        case "AIRFLOW_DAG":
            return (
                <Stack>
                    <ApacheAirflowIcon />
                    {translate(`resources.jobs.types.airflow.dag`)}
                </Stack>
            );
        case "AIRFLOW_TASK":
            return (
                <Stack>
                    <ApacheAirflowIcon />
                    {translate(`resources.jobs.types.airflow.task`)}
                </Stack>
            );
        default:
            return (
                <Stack>
                    <QuestionMark />
                    {record.type}
                </Stack>
            );
    }
};

export default JobIconWithText;
