import { ReactElement } from "react";
import {
    Show,
    SimpleShowLayout,
    TabbedShowLayout,
    TextField,
    WithRecord,
    WrapperField,
} from "react-admin";

import JobIconWithType from "./JobIconWithType";
import JobLineage from "./JobRaLineage";
import { RunRaListForJob } from "@/components/run";
import { LocationIconWithType } from "@/components/location";

const JobRaShow = (): ReactElement => {
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

                <TabbedShowLayout>
                    <TabbedShowLayout.Tab label="resources.jobs.tabs.runs">
                        <WithRecord
                            render={(record) => (
                                <RunRaListForJob jobId={record.id} />
                            )}
                        />
                    </TabbedShowLayout.Tab>

                    <TabbedShowLayout.Tab
                        label="resources.jobs.tabs.lineage"
                        path="lineage"
                    >
                        <JobLineage />
                    </TabbedShowLayout.Tab>
                </TabbedShowLayout>
            </SimpleShowLayout>
        </Show>
    );
};

export default JobRaShow;
