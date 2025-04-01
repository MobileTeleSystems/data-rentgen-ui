import { Stack } from "@mui/material";
import { ReactElement } from "react";
import {
    DateField,
    Empty,
    FunctionField,
    Labeled,
    ReferenceField,
    RichTextField,
    Show,
    SimpleShowLayout,
    TabbedShowLayout,
    TextField,
    UrlField,
    WithRecord,
} from "react-admin";
import {
    DurationRaField,
    IOStatisticsField,
    StatusRaField,
} from "@/components/base";
import { OperationRaListForRun } from "@/components/operation";
import RunRaLineage from "./RunRaLineage";
import RunRaListForParentRun from "./RunRaListForParentRun";
import { RunDetailedResponseV1 } from "@/dataProvider/types";

const RunRaShow = (): ReactElement => {
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id" label="resources.runs.fields.id" />

                <Labeled label="resources.runs.sections.created">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.runs.sections.when">
                            <DateField
                                source="data.created_at"
                                showTime={true}
                            />
                        </Labeled>
                        <Labeled label="resources.runs.sections.for_job">
                            <ReferenceField
                                source="data.job_id"
                                reference="jobs"
                            />
                        </Labeled>
                        <Labeled label="resources.runs.sections.by_parent_run">
                            <ReferenceField
                                source="data.parent_run_id"
                                reference="runs"
                            />
                        </Labeled>
                    </Stack>
                </Labeled>

                <Labeled label="resources.runs.sections.started">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.runs.sections.when">
                            <DateField
                                source="data.started_at"
                                showTime={true}
                            />
                        </Labeled>
                        <Labeled label="resources.runs.sections.how">
                            <TextField source="data.start_reason" />
                        </Labeled>
                        <Labeled label="resources.runs.sections.as_user">
                            <TextField source="data.started_by_user.name" />
                        </Labeled>
                    </Stack>
                </Labeled>

                <StatusRaField source="status" />
                <Labeled label="resources.runs.sections.ended">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.runs.sections.when">
                            <DateField source="data.ended_at" showTime={true} />
                        </Labeled>
                        <Labeled label="resources.runs.sections.how">
                            <RichTextField source="data.end_reason" />
                        </Labeled>
                        <Labeled label="resources.runs.sections.duration">
                            <DurationRaField source="duration" />
                        </Labeled>
                    </Stack>
                </Labeled>

                <Labeled label="resources.runs.sections.external">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.runs.sections.external_id">
                            <TextField source="data.external_id" />
                        </Labeled>
                        <Labeled label="resources.runs.sections.attempt">
                            <TextField source="data.attempt" />
                        </Labeled>
                        <Labeled label="resources.runs.sections.external_url">
                            <UrlField
                                source="data.running_log_url"
                                target="_blank"
                            />
                        </Labeled>
                        <Labeled label="resources.runs.sections.logs_url">
                            <UrlField
                                source="data.persistent_log_url"
                                target="_blank"
                            />
                        </Labeled>
                    </Stack>
                </Labeled>

                <Labeled label="resources.runs.sections.statistics.name">
                    <Stack direction="row" spacing={3}>
                        <Labeled label="resources.runs.sections.statistics.inputs">
                            <IOStatisticsField source="statistics.inputs" />
                        </Labeled>
                        <Labeled label="resources.runs.sections.statistics.outputs">
                            <IOStatisticsField source="statistics.outputs" />
                        </Labeled>
                    </Stack>
                </Labeled>

                <TabbedShowLayout>
                    <TabbedShowLayout.Tab label="resources.runs.tabs.operations">
                        <FunctionField
                            render={(record: RunDetailedResponseV1) =>
                                record.statistics.operations.total_operations >
                                0 ? (
                                    <OperationRaListForRun run={record.data} />
                                ) : (
                                    <Empty resource="operations" />
                                )
                            }
                        />
                    </TabbedShowLayout.Tab>

                    <TabbedShowLayout.Tab label="resources.runs.tabs.child_runs">
                        <WithRecord
                            render={(record) => (
                                <RunRaListForParentRun
                                    parentRun={record.data}
                                />
                            )}
                        />
                    </TabbedShowLayout.Tab>

                    <TabbedShowLayout.Tab
                        label="resources.runs.tabs.lineage"
                        path="lineage"
                    >
                        <FunctionField
                            render={(record: RunDetailedResponseV1) =>
                                record.statistics.inputs.total_datasets +
                                    record.statistics.outputs.total_datasets >
                                0 ? (
                                    <RunRaLineage />
                                ) : (
                                    <Empty resource="data" />
                                )
                            }
                        />
                    </TabbedShowLayout.Tab>
                </TabbedShowLayout>
            </SimpleShowLayout>
        </Show>
    );
};

export default RunRaShow;
