import { ReactElement } from "react";
import {
    Show,
    SimpleShowLayout,
    TextField,
    useTranslate,
    WithRecord,
    WrapperField,
} from "react-admin";
import Divider from "@mui/material/Divider";

import JobIconWithText from "./JobIcon";
import JobLocationIconWithText from "./JobLocationIcon";
import { RunListForJob } from "../run";

const JobShow = (): ReactElement => {
    const translate = useTranslate();
    return (
        <Show resource="jobs">
            <SimpleShowLayout>
                <TextField source="id" />
                <WrapperField source="type">
                    <JobIconWithText />
                </WrapperField>
                <TextField source="name" />
                <WrapperField source="location.type">
                    <JobLocationIconWithText />
                </WrapperField>
                <TextField source="location.name" />

                <Divider>{translate("resources.jobs.sections.runs")}</Divider>

                <WithRecord
                    render={(record) => <RunListForJob jobId={record.id} />}
                />
            </SimpleShowLayout>
        </Show>
    );
};

export default JobShow;
