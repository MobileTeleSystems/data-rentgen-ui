import { ReactElement } from "react";
import {
    List,
    DatagridConfigurable,
    DateField,
    ReferenceField,
    WrapperField,
    TextField,
} from "react-admin";

import {
    DurationRaField,
    StatusField,
    ListActions,
    IOStatisticsField,
} from "@/components/base";
import RunRaListFilters from "./RunRaListFilters";
import RunRaExternalId from "./RunRaExternalId";

const RunRaList = (): ReactElement => {
    return (
        <List
            resource="runs"
            actions={
                <ListActions>
                    <RunRaListFilters />
                </ListActions>
            }
            storeKey={false}
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
                <DurationRaField source="duration" sortable={false} />
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
                <TextField
                    source="statistics.operations.total_operations"
                    label="resources.runs.fields.statistics.operations"
                />
                <IOStatisticsField source="statistics.inputs" />
                <IOStatisticsField source="statistics.outputs" />
            </DatagridConfigurable>
        </List>
    );
};

export default RunRaList;
