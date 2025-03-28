import { ReactElement } from "react";
import {
    Show,
    SimpleShowLayout,
    TabbedShowLayout,
    TextField,
    WithRecord,
} from "react-admin";

import JobRaLineage from "./JobRaLineage";
import { RunRaListForJob } from "@/components/run";
import {
    LocationRaNameWithLinkField,
    LocationRaTypeWithIconField,
} from "@/components/location";
import JobRaTypeField from "./JobRaTypeField";

const JobRaShow = (): ReactElement => {
    return (
        <Show resource="jobs">
            <SimpleShowLayout>
                <TextField source="id" label="resources.jobs.fields.id" />
                <JobRaTypeField
                    source="data.type"
                    label="resources.jobs.fields.type"
                />
                <TextField
                    source="data.name"
                    label="resources.jobs.fields.name"
                />

                <LocationRaTypeWithIconField
                    source="data.location.type"
                    label="resources.locations.fields.type"
                />
                <LocationRaNameWithLinkField
                    source="data.location.name"
                    label="resources.locations.fields.name"
                />

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
                        <JobRaLineage />
                    </TabbedShowLayout.Tab>
                </TabbedShowLayout>
            </SimpleShowLayout>
        </Show>
    );
};

export default JobRaShow;
