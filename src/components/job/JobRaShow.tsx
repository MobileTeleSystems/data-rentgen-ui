import { ReactElement } from "react";
import {
    Show,
    SimpleShowLayout,
    TabbedShowLayout,
    TextField,
    WithRecord,
} from "react-admin";

import JobLineage from "./JobRaLineage";
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
                <TextField source="id" />
                <JobRaTypeField source="type" />

                <LocationRaTypeWithIconField source="location.type" />
                <LocationRaNameWithLinkField source="location.name" />

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
