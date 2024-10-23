import { ReactElement } from "react";
import {
    Show,
    SimpleShowLayout,
    TabbedShowLayout,
    TextField,
    WithRecord,
    WrapperField,
} from "react-admin";
import Divider from "@mui/material/Divider";

import JobIconWithText from "./JobIcon";
import JobLocationIconWithText from "./JobLocationIcon";
import { RunListForJob } from "../run";

const JobShow = (): ReactElement => {
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
                <Divider />
                <WithRecord
                    label="Runs"
                    render={(record) => <RunListForJob jobId={record.id} />}
                />
            </SimpleShowLayout>
        </Show>
    );
};

export default JobShow;
