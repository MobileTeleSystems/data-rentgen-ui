import { ReactElement } from "react";
import {
    Show,
    SimpleShowLayout,
    TextField,
    useTranslate,
    WithRecord,
    WrapperField,
} from "react-admin";
import { Divider } from "@mui/material";

import JobIconWithType from "./JobIconWithType";
import { RunRaListForJob } from "@/components/run";
import { LocationIconWithType } from "@/components/location";

const JobRaShow = (): ReactElement => {
    const translate = useTranslate();
    return (
        <Show resource="jobs">
            <SimpleShowLayout>
                <TextField source="id" />
                <WrapperField source="type">
                    <WithRecord
                        render={(record) => <JobIconWithType job={record} />}
                    />
                </WrapperField>
                <TextField source="name" />

                <WrapperField source="location.type">
                    <WithRecord
                        render={(record) => (
                            <LocationIconWithType location={record.location} />
                        )}
                    />
                </WrapperField>
                <TextField source="location.name" />

                <Divider>{translate("resources.jobs.sections.runs")}</Divider>

                <WithRecord
                    render={(record) => <RunRaListForJob jobId={record.id} />}
                />
            </SimpleShowLayout>
        </Show>
    );
};

export default JobRaShow;
