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
    StatusRaField,
    ListActions,
    IOStatisticsField,
} from "@/components/base";
import RunRaExternalId from "./RunRaExternalId";
import RunRaListFilters from "./RunRaListFilters";
import { RunResponseV1 } from "@/dataProvider/types";

const RunRaListForParentRun = ({
    parentRun,
}: {
    parentRun: RunResponseV1;
}): ReactElement => {
    return (
        <List
            resource="runs"
            filter={{ parent_run_id: parentRun.id }}
            filterDefaultValues={{ since: parentRun.created_at }}
            actions={
                <ListActions>
                    <RunRaListFilters />
                </ListActions>
            }
            title={false}
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
                <StatusRaField source="status" sortable={false} />
                <DurationRaField source="duration" sortable={false} />
                <WrapperField source="started_by_user" sortable={false}>
                    <TextField source="data.started_by_user.name" />
                </WrapperField>
                <RunRaExternalId
                    source="data.external_id"
                    label="resources.runs.fields.external_id"
                    sortable={false}
                />
                {/* Do not show parent_run, as we already in parent RunShow page*/}
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

export default RunRaListForParentRun;
