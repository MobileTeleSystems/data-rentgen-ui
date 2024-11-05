import { ReactElement, useState } from "react";
import {
    List,
    DatagridConfigurable,
    DateField,
    ReferenceField,
    WrapperField,
    TextField,
} from "react-admin";

import { DurationField, StatusField, ListActions } from "@/components/base";
import RunRaExternalId from "./RunRaExternalId";
import RunRaListFilters from "./RunRaListFilters";

const RunRaListForJob = ({ jobId }: { jobId: number }): ReactElement => {
    // Hack to avoid sending any network requests until user passed all required filters
    // See https://github.com/marmelab/react-admin/issues/10286
    const [enabled, setEnabled] = useState(false);

    return (
        <List
            resource="runs"
            filter={{ job_id: jobId }}
            actions={
                <ListActions>
                    <RunRaListFilters
                        isReadyCallback={setEnabled}
                        requiredFilters={["since"]}
                    />
                </ListActions>
            }
            queryOptions={{ enabled }}
            /* Use distinct filters from RunList component */
            storeKey="runListForJob"
            title={false}
        >
            <DatagridConfigurable bulkActionButtons={false}>
                <DateField
                    source="created_at"
                    showTime={true}
                    sortable={false}
                />
                {/* Do not show job, as we already in JobShow page*/}
                <StatusField source="status" sortable={false} />
                <DurationField source="duration" sortable={false} />
                <WrapperField source="started_by_user" sortable={false}>
                    <TextField source="started_by_user.name" />
                </WrapperField>
                <RunRaExternalId source="external_id" sortable={false} />
                <ReferenceField
                    source="parent_run_id"
                    reference="runs"
                    sortable={false}
                />
            </DatagridConfigurable>
        </List>
    );
};

export default RunRaListForJob;
