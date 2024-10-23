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
import RunExternalIdField from "./RunExternalIdField";
import RunListFilters from "./RunListFilters";

const RunListForJob = ({ jobId }: { jobId: number }): ReactElement => {
    // Hack to avoid sending any network requests until user passed all required filters
    // See https://github.com/marmelab/react-admin/issues/10286
    const [enabled, setEnabled] = useState(false);

    return (
        <List
            resource="runs"
            filter={{ job_id: jobId }}
            actions={
                <ListActions>
                    <RunListFilters
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
                <DateField source="created_at" showTime={true} />
                {/* Do not show job, as we already in JobShow page*/}
                <StatusField source="status" />
                <DurationField
                    source="duration"
                    start_field="started_at"
                    end_field="ended_at"
                />
                <WrapperField source="started_by_user">
                    <TextField source="started_by_user.name" />
                </WrapperField>
                <RunExternalIdField source="external_id" />
                <ReferenceField source="parent_run_id" reference="runs" />
            </DatagridConfigurable>
        </List>
    );
};

export default RunListForJob;
