import { ReactElement } from "react";
import { ApacheHadoopIcon } from "@/components/icons";
import { useRecordContext, useTranslate } from "react-admin";
import { JobResponseV1 } from "@/dataProvider/types";
import { Computer, Public, QuestionMark } from "@mui/icons-material";
import { Stack } from "@mui/material";

const JobLocationIcon = (): ReactElement | null => {
    const record = useRecordContext<JobResponseV1>();
    if (!record) {
        return null;
    }

    const translate = useTranslate();

    switch (record.location.type) {
        case "yarn":
            return (
                <Stack>
                    <ApacheHadoopIcon />
                    {translate(`resources.locations.types.yarn`)}
                </Stack>
            );
        case "local":
            return (
                <Stack>
                    <Computer />
                    {translate(`resources.locations.types.local`)}
                </Stack>
            );
        case "http":
            return (
                <Stack>
                    <Public />
                    {translate(`resources.locations.types.http`)}
                </Stack>
            );
        case "https":
            return (
                <Stack>
                    <Public />
                    {translate(`resources.locations.types.https`)}
                </Stack>
            );
        default:
            return (
                <Stack>
                    <QuestionMark />
                    {record.location.type}
                </Stack>
            );
    }
};

export default JobLocationIcon;
