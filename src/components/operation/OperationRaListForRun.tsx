import { ReactElement } from "react";
import {
    List,
    DatagridConfigurable,
    DateField,
    TextField,
    FunctionField,
} from "react-admin";

import {
    DurationRaField,
    StatusRaField,
    ListActions,
    IOStatisticsField,
} from "@/components/base";
import { RunResponseV1 } from "@/dataProvider/types";
import OperationRaListFilters from "./OperationRaListFilters";

const OperationRaListForRun = ({
    run,
}: {
    run: RunResponseV1;
}): ReactElement => {
    return (
        <List
            resource="operations"
            filter={{ run_id: run.id }}
            filterDefaultValues={{ since: run.created_at }}
            actions={
                <ListActions>
                    <OperationRaListFilters />
                </ListActions>
            }
            title={false}
            storeKey={false}
        >
            <DatagridConfigurable bulkActionButtons={false}>
                <DateField
                    source="data.created_at"
                    label="resources.operations.fields.created_at"
                    showTime={true}
                />
                {/* Do not show run, as we already in RunRaShow page*/}
                <TextField
                    source="data.position"
                    label="resources.operations.fields.position"
                    sortable={false}
                />
                <TextField
                    source="data.group"
                    label="resources.operations.fields.group"
                    sortable={false}
                />
                <FunctionField
                    source="description"
                    render={(record) =>
                        record.data.description || record.data.name
                    }
                    sortable={false}
                />
                <StatusRaField source="status" sortable={false} />
                <DurationRaField source="duration" sortable={false} />
                <IOStatisticsField source="statistics.inputs" />
                <IOStatisticsField source="statistics.outputs" />
            </DatagridConfigurable>
        </List>
    );
};

export default OperationRaListForRun;
