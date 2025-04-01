import { Stack } from "@mui/material";
import { ReactElement } from "react";
import {
    DateField,
    FunctionField,
    Labeled,
    ReferenceField,
    Show,
    SimpleShowLayout,
    TabbedShowLayout,
    TextField,
} from "react-admin";
import {
    DurationRaField,
    IOStatisticsField,
    StatusRaField,
} from "@/components/base";
import OperationRaLineage from "./OperationRaLineage";
import { OperationDetailedResponseV1 } from "@/dataProvider/types";

const OperationRaShow = (): ReactElement => {
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id" label="resources.operations.fields.id" />
                <TextField
                    source="data.name"
                    label="resources.operations.fields.name"
                />

                <Labeled label="resources.operations.sections.external">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.operations.sections.position">
                            <TextField source="data.position" />
                        </Labeled>
                        <Labeled label="resources.operations.sections.group">
                            <TextField source="data.group" />
                        </Labeled>
                        <Labeled label="resources.operations.sections.description">
                            <TextField source="data.description" />
                        </Labeled>
                    </Stack>
                </Labeled>

                <Labeled label="resources.operations.sections.created">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.operations.sections.when">
                            <DateField
                                source="data.created_at"
                                showTime={true}
                            />
                        </Labeled>
                        <Labeled label="resources.operations.sections.by_run">
                            <ReferenceField
                                source="data.run_id"
                                reference="runs"
                            />
                        </Labeled>
                    </Stack>
                </Labeled>

                <DateField
                    source="data.started_at"
                    label="resources.operations.fields.started_at"
                    showTime={true}
                />

                <StatusRaField source="status" />
                <Labeled label="resources.operations.sections.ended">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.operations.sections.when">
                            <DateField source="data.ended_at" showTime={true} />
                        </Labeled>
                        <Labeled label="resources.operations.sections.duration">
                            <DurationRaField source="duration" />
                        </Labeled>
                    </Stack>
                </Labeled>

                <Labeled label="resources.operations.sections.statistics.name">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.operations.sections.statistics.inputs">
                            <IOStatisticsField source="statistics.inputs" />
                        </Labeled>
                        <Labeled label="resources.operations.sections.statistics.outputs">
                            <IOStatisticsField source="statistics.outputs" />
                        </Labeled>
                    </Stack>
                </Labeled>

                <FunctionField
                    render={(record: OperationDetailedResponseV1) => {
                        return record.statistics.inputs.total_datasets +
                            record.statistics.outputs.total_datasets >
                            0 ? (
                            <TabbedShowLayout>
                                <TabbedShowLayout.Tab label="resources.operations.tabs.lineage">
                                    <OperationRaLineage />
                                </TabbedShowLayout.Tab>
                            </TabbedShowLayout>
                        ) : null;
                    }}
                />
            </SimpleShowLayout>
        </Show>
    );
};

export default OperationRaShow;
