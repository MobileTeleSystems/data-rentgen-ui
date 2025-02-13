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
import RunRaListFilters from "./RunRaListFilters";
import RunRaExternalId from "./RunRaExternalId";

const RunRaList = (): ReactElement => {
    // Hack to avoid sending any network requests until user passed all required filters
    // See https://github.com/marmelab/react-admin/issues/10286
    const [enabled, setEnabled] = useState(false);

    return (
        <List
            resource="runs"
            actions={
                <ListActions>
                    <RunRaListFilters
                        isReadyCallback={setEnabled}
                        requiredFilters={["since", "search_query"]}
                    />
                </ListActions>
            }
            queryOptions={{ enabled }}
        >
            <DatagridConfigurable bulkActionButtons={false}>
                <DateField
                    source="data.created_at"
                    label="resources.runs.fields.created_at"
                    showTime={true}
                    sortable={false}
                />
                <ReferenceField
                    source="data.job_id"
                    label="resources.runs.fields.job"
                    reference="jobs"
                    sortable={false}
                />
                <StatusField source="status" sortable={false} />
                <DurationField source="duration" sortable={false} />
                <WrapperField source="started_by_user" sortable={false}>
                    <TextField source="data.started_by_user.name" />
                </WrapperField>
                <RunRaExternalId
                    source="data.external_id"
                    label="resources.runs.fields.external_id"
                    sortable={false}
                />
                <ReferenceField
                    source="data.parent_run_id"
                    label="resources.runs.fields.parent_run"
                    reference="runs"
                    sortable={false}
                />
            </DatagridConfigurable>
        </List>
    );
};

export default RunRaList;
